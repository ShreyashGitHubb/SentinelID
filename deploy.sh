#!/bin/bash

# SentinelID: Multi-Service Cloud Run Deployment Script
# Usage: ./deploy.sh [PROJECT_ID]

PROJECT_ID=$1

if [ -z "$PROJECT_ID" ]; then
    echo "Usage: ./deploy.sh [PROJECT_ID]"
    exit 1
fi

echo "🚀 Starting SentinelID Deployment for Project: $PROJECT_ID"

# 1. Backend Deployment
echo "📦 Building & Deploying Backend..."
cd backend
gcloud builds submit --tag gcr.io/$PROJECT_ID/sentinel-backend
gcloud run deploy sentinel-backend \
    --image gcr.io/$PROJECT_ID/sentinel-backend \
    --platform managed \
    --region us-central1 \
    --allow-unauthenticated \
    --port 8080

# Get the Backend URL
BACKEND_URL=$(gcloud run services describe sentinel-backend --platform managed --region us-central1 --format 'value(status.url)')
echo "✅ Backend deployed at: $BACKEND_URL"

# 2. Frontend Deployment
echo "📦 Building & Deploying Frontend..."
cd ../frontend

# Build the frontend with the backend URL as an environment variable
gcloud builds submit --tag gcr.io/$PROJECT_ID/sentinel-frontend \
    --build-arg NEXT_PUBLIC_API_URL=$BACKEND_URL

gcloud run deploy sentinel-frontend \
    --image gcr.io/$PROJECT_ID/sentinel-frontend \
    --platform managed \
    --region us-central1 \
    --allow-unauthenticated \
    --port 8080

FRONTEND_URL=$(gcloud run services describe sentinel-frontend --platform managed --region us-central1 --format 'value(status.url)')

echo "🎉 Deployment Complete!"
echo "--------------------------------------------------"
echo "Frontend: $FRONTEND_URL"
echo "Backend API: $BACKEND_URL"
echo "--------------------------------------------------"
echo "Next Steps: Update your Firebase Console with the Frontend URL in authorized domains."
