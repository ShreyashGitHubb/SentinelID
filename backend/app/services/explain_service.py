import google.generativeai as genai
import os
from dotenv import load_dotenv
from typing import Dict

load_dotenv()

class ExplainService:
    def __init__(self):
        api_key = os.getenv("GOOGLE_API_KEY")
        if api_key:
            genai.configure(api_key=api_key)
            self.model = genai.GenerativeModel('gemini-1.5-flash')
        else:
            self.model = None

    async def explain_detection(self, freq_score: float, vit_score: float, verdict: str) -> str:
        """
        Generates a professional fraud analysis based on detection metrics.
        """
        if not self.model:
            return "Gemini API key not configured. Please check your .env file for natural language insights."

        prompt = f"""
        You are 'Sentinel AI', a professional forensic document analyst.
        Analyze the following fraud detection scores for a government-issued ID/document:
        
        - Frequency Artifact Score: {freq_score:.2f} (Detects GAN/AI upsampling)
        - Vision Transformer Confidence: {vit_score:.2f} (Detects spatial inconsistencies)
        - Initial Verdict: {verdict}
        
        Provide a concise, professional 'Sentinel Insight' (max 3 sentences). 
        Focus on explaining *why* these technical signals matter (e.g., mention aliasing, neural consistency, or pixel manipulation).
        Do not use markdown formatting like bold or headers. Just plain text.
        """
        
        try:
            response = await self.model.generate_content_async(prompt)
            return response.text.strip()
        except Exception as e:
            return f"Analysis temporarily unavailable: {str(e)}"

explain_service = ExplainService()
