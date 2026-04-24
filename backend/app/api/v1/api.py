from fastapi import APIRouter
from app.api.v1.endpoints import detect, history

api_router = APIRouter()
api_router.include_router(detect.router, prefix="/detect", tags=["Detection"])
api_router.include_router(history.router, prefix="/history", tags=["History"])
