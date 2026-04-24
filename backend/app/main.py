from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1.api import api_router
import uvicorn

app = FastAPI(
    title="SentinelID | Enterprise Fraud Detection API",
    version="1.0.0",
    description="Professional deepfake and biometric verification API powered by ViT and Gemini 1.5 Flash."
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Versioned API Routes
app.include_router(api_router, prefix="/api/v1")

@app.get("/")
async def root():
    return {
        "message": "SentinelID Enterprise API is active",
        "docs": "/docs",
        "version": "v1.0.0"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
