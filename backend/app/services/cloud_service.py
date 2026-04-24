import os
import datetime
from google.cloud import storage
import firebase_admin
from firebase_admin import credentials, firestore, auth
from dotenv import load_dotenv
import io

load_dotenv()

# Initialize Firebase Admin
# Expects a path to a service account JSON file in environment variables
cred_path = os.getenv("FIREBASE_SERVICE_ACCOUNT")
if cred_path and os.path.exists(cred_path):
    cred = credentials.Certificate(cred_path)
    firebase_admin.initialize_app(cred)
else:
    # Fallback to default credentials if running in GCP environment
    try:
        firebase_admin.initialize_app()
    except Exception:
        print("Warning: Firebase Admin not initialized. Firestore and Auth will be disabled.")

class CloudService:
    def __init__(self):
        self.db = firestore.client() if firebase_admin._apps else None
        self.storage_client = storage.Client() if os.getenv("GOOGLE_APPLICATION_CREDENTIALS") else None
        self.bucket_name = os.getenv("GCS_BUCKET_NAME", "sentinel-id-assets")

    def upload_to_gcs(self, file_bytes: bytes, filename: str) -> str:
        """
        Uploads an image to GCS and returns the public/internal URL.
        """
        if not self.storage_client:
            return "local_storage_simulated"

        try:
            bucket = self.storage_client.bucket(self.bucket_name)
            # Use timestamp to avoid collisions
            blob_name = f"scans/{datetime.datetime.now().strftime('%Y%m%d_%H%M%S')}_{filename}"
            blob = bucket.blob(blob_name)
            
            blob.upload_from_string(file_bytes, content_type="image/jpeg")
            return blob.public_url
        except Exception as e:
            print(f"GCS Upload Error: {e}")
            return f"error_{filename}"

    def audit_log(self, user_id: str, scan_result: dict):
        """
        Saves a scan result to Firestore for the audit trail.
        """
        if not self.db:
            print("Firestore disabled. Log skipped.")
            return

        try:
            doc_ref = self.db.collection("audit_logs").document()
            doc_ref.set({
                "userId": user_id,
                "timestamp": firestore.SERVER_TIMESTAMP,
                "filename": scan_result.get("filename"),
                "overallConfidence": scan_result.get("overall_confidence"),
                "verdict": scan_result.get("vision_transformer", {}).get("label"),
                "details": {
                    "freq_score": scan_result.get("frequency_analysis", {}).get("high_freq_score"),
                    "vit_score": scan_result.get("vision_transformer", {}).get("confidence")
                }
            })
            return doc_ref.id
        except Exception as e:
            print(f"Firestore Error: {e}")

    def verify_token(self, token: str):
        """
        Verifies a Firebase ID Token.
        """
        if not firebase_admin._apps:
            return {"uid": "demo_user"} # Simulation mode
        
        try:
            decoded_token = auth.verify_id_token(token)
            return decoded_token
        except Exception as e:
            print(f"Token Verification Error: {e}")
            return None

cloud_service = CloudService()
