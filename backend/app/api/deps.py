from fastapi import HTTPException, Security
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from app.services.cloud_service import cloud_service

security = HTTPBearer()

async def get_current_user(auth_cred: HTTPAuthorizationCredentials = Security(security)):
    token = auth_cred.credentials
    user = cloud_service.verify_token(token)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid or expired authentication token")
    return user
