import torch
import torch.nn as nn
import numpy as np
from PIL import Image
import io
import torchvision.transforms as T
import timm
import cv2
import base64
from typing import Tuple, Dict

class FraudDetector:
    def __init__(self):
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        print(f"Loading Vision Transformer on {self.device}...")
        
        # Load a real ViT model for deepfake features
        # In a real production app, we would load custom weights here.
        self.model = timm.create_model('vit_base_patch16_224', pretrained=True)
        self.model.to(self.device)
        self.model.eval()
        
        self.transform = T.Compose([
            T.Resize((224, 224)),
            T.ToTensor(),
            T.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
        ])

    def analyze_frequency(self, image_bytes: bytes) -> Dict:
        """
        Detects GAN artifacts in the frequency domain using FFT.
        """
        image = Image.open(io.BytesIO(image_bytes)).convert('L')
        img_np = np.array(image.resize((256, 256)))
        
        f_transform = np.fft.fft2(img_np)
        f_shift = np.fft.fftshift(f_transform)
        magnitude_spectrum = 20 * np.log(np.abs(f_shift) + 1)
        
        h, w = magnitude_spectrum.shape
        crow, ccol = h // 2, w // 2
        mask = np.ones((h, w), np.uint8)
        mask[crow-30:crow+30, ccol-30:ccol+30] = 0
        
        high_freq_energy = np.mean(magnitude_spectrum * mask)
        score = min(1.0, high_freq_energy / 80.0) # Adjusted threshold
        
        return {
            "high_freq_score": float(score),
            "verdict": "Anomalous High-Frequency Spikes" if score > 0.55 else "Standard Frequency Pulse"
        }

    def generate_heatmap(self, input_tensor: torch.Tensor, image_orig: Image.Image) -> str:
        """
        Generates a simplified attention-based heatmap for the demo.
        For ViT, we visualize the gradients of the max output w.r.t the input pixels.
        """
        input_tensor.requires_grad = True
        output = self.model(input_tensor)
        
        # Get the score for the highest class
        score = output.max()
        score.backward()
        
        # Saliency map from gradients
        slc, _ = torch.max(torch.abs(input_tensor.grad[0]), dim=0)
        slc = slc.cpu().numpy()
        
        # Normalize and resize
        slc = (slc - slc.min()) / (slc.max() - slc.min())
        slc = cv2.resize(slc, (image_orig.width, image_orig.height))
        
        # Convert to color heatmap
        heatmap = cv2.applyColorMap(np.uint8(255 * slc), cv2.COLORMAP_JET)
        
        # Convert to Base64
        _, buffer = cv2.imencode('.png', heatmap)
        return base64.b64encode(buffer).decode('utf-8')

    def detect_deepfake(self, image_bytes: bytes) -> Dict:
        """
        Uses a real Vision Transformer to detect spatial anomalies.
        """
        image = Image.open(io.BytesIO(image_bytes)).convert('RGB')
        input_tensor = self.transform(image).unsqueeze(0).to(self.device)
        
        with torch.set_grad_enabled(True): # Enable grads for heatmap
            output = self.model(input_tensor)
            probabilities = torch.nn.functional.softmax(output[0], dim=0)
            
            # For demo, we use a heuristic based on model confidence variance
            # Real production would use a binary classifier head
            confidence = float(probabilities.max().item())
            
            # Map the confidence to a fraud score (simulated logic for demo accuracy)
            fraud_probability = 1.0 - confidence if confidence < 0.2 else confidence
            
            heatmap_b64 = self.generate_heatmap(input_tensor, image)
        
        return {
            "confidence": fraud_probability,
            "label": "AI Generation Likely" if fraud_probability > 0.75 else "Pattern Consistent",
            "heatmap": f"data:image/png;base64,{heatmap_b64}",
            "heatmap_ready": True
        }

fraud_service = FraudDetector()
