import httpx
import os
import hmac
import hashlib
import json
import asyncio
from dotenv import load_dotenv
from typing import Any, Dict

load_dotenv()

class WebhookService:
    def __init__(self):
        self.webhook_url = os.getenv("WEBHOOK_URL")
        self.webhook_secret = os.getenv("WEBHOOK_SECRET", "sentinel_secret_key")

    async def send_alert(self, payload: Dict[str, Any]):
        """
        Sends an asynchronous alert to the configured webhook URL.
        Only called for high-risk detections.
        """
        if not self.webhook_url:
            print("Webhook URL not configured. Skipping alert.")
            return

        # Prepare payload
        data = json.dumps(payload)
        
        # Create HMAC signature
        signature = hmac.new(
            self.webhook_secret.encode('utf-8'),
            data.encode('utf-8'),
            hashlib.sha256
        ).hexdigest()

        headers = {
            "Content-Type": "application/json",
            "X-Sentinel-Signature": signature,
            "User-Agent": "SentinelID-Webhook-Service/1.0"
        }

        try:
            async with httpx.AsyncClient(timeout=10.0) as client:
                response = await client.post(
                    self.webhook_url,
                    content=data,
                    headers=headers
                )
                print(f"Webhook alert sent to {self.webhook_url}. Status: {response.status_code}")
        except Exception as e:
            print(f"Failed to send webhook alert: {e}")

webhook_service = WebhookService()
