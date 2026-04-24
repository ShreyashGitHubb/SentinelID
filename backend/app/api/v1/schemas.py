from pydantic import BaseModel, Field
from typing import Dict, Any, Optional

class FrequencyAnalysis(BaseModel):
    high_freq_score: float = Field(..., description="Normalized score for high-frequency artifacts")
    verdict: str = Field(..., description="Human-readable verdict for frequency check")

class VisionTransformerResults(BaseModel):
    confidence: float = Field(..., description="AI confidence score for deepfake detection")
    label: str = Field(..., description="Classification label")
    heatmap: Optional[str] = Field(None, description="Base64 encoded Grad-CAM heatmap")
    heatmap_ready: bool = Field(True)

class DetectionResponse(BaseModel):
    filename: str
    gcs_url: Optional[str] = None
    overall_confidence: float
    explanation: str
    frequency_analysis: FrequencyAnalysis
    vision_transformer: VisionTransformerResults
    audit_log_id: Optional[str] = None
