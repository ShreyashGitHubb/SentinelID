from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
from app.api.deps import get_current_user
from app.services.fraud_detector import fraud_service
from app.services.explain_service import explain_service
from app.services.cloud_service import cloud_service
from app.services.webhook_service import webhook_service
from app.api.v1.schemas import DetectionResponse
import asyncio

router = APIRouter()

@router.post("/", response_model=DetectionResponse)
async def detect_fraud(
    file: UploadFile = File(...),
    current_user: dict = Depends(get_current_user)
):
    """
    Main detection endpoint for SentinelID. 
    Performs frequency analysis, ViT spatial reasoning, and generates dynamic insights.
    Logs result to Firestore and uploads to GCS.
    """
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image")
    
    contents = await file.read()
    
    # 1. Upload to GCS
    gcs_url = cloud_service.upload_to_gcs(contents, file.filename)
    
    # 2. Run scan
    freq_results = fraud_service.analyze_frequency(contents)
    vit_results = fraud_service.detect_deepfake(contents)
    
    # 3. Explainability
    overall_confidence = (freq_results["high_freq_score"] + vit_results["confidence"]) / 2
    explanation = await explain_service.explain_detection(
        freq_results["high_freq_score"], 
        vit_results["confidence"],
        vit_results["label"]
    )
    
    # 4. Result Assembly
    result = {
        "filename": file.filename,
        "gcs_url": gcs_url,
        "frequency_analysis": freq_results,
        "vision_transformer": vit_results,
        "overall_confidence": overall_confidence,
        "explanation": explanation
    }
    
    # 5. Long-term persistence and auditing
    log_id = cloud_service.audit_log(current_user["uid"], result)
    result["audit_log_id"] = log_id

    # 6. Webhook Trigger for High Risk
    if overall_confidence > 0.8:
        # Run in background to avoid blocking response
        asyncio.create_task(webhook_service.send_alert({
            "event": "fraud_detected",
            "confidence": overall_confidence,
            "user_id": current_user["uid"],
            "audit_log_id": log_id,
            "filename": file.filename,
            "verdict": vit_results["label"]
        }))
    
    return result
