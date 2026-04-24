from fastapi import APIRouter, Depends, HTTPException
from app.api.deps import get_current_user
from app.services.cloud_service import cloud_service
from firebase_admin import firestore
from typing import List, Any

router = APIRouter()

@router.get("/")
async def get_history(
    current_user: dict = Depends(get_current_user),
    limit: int = 20
):
    """
    Fetches the scan history for the authenticated user from Firestore.
    """
    if not cloud_service.db:
        raise HTTPException(status_code=503, detail="Firestore not initialized")

    try:
        # Query Firestore for logs belonging to this UID, ordered by timestamp
        docs = cloud_service.db.collection("audit_logs") \
            .where("userId", "==", current_user["uid"]) \
            .order_by("timestamp", direction=firestore.Query.DESCENDING) \
            .limit(limit) \
            .stream()

        history = []
        for doc in docs:
            data = doc.to_dict()
            # Convert Firestore timestamp to ISO string for JSON serialization
            if "timestamp" in data and data["timestamp"]:
                data["timestamp"] = data["timestamp"].isoformat()
            data["id"] = doc.id
            history.append(data)

        return {"history": history, "count": len(history)}
    except Exception as e:
        print(f"History Fetch Error: {e}")
        # Fallback to empty list or error
        return {"history": [], "error": str(e)}
