param (
    [string]$ProjectId = "solutionchallange-494310"
)

Write-Host "Starting SentinelID Deployment for Project: $ProjectId"

# 1. Backend Deployment
Write-Host "Building and Deploying Backend..."
Set-Location backend
gcloud builds submit --tag gcr.io/$ProjectId/sentinel-backend
gcloud run deploy sentinel-backend `
    --image gcr.io/$ProjectId/sentinel-backend `
    --platform managed `
    --region us-central1 `
    --allow-unauthenticated `
    --memory 2Gi `
    --port 8080

# Get the Backend URL
$BackendUrl = gcloud run services describe sentinel-backend --platform managed --region us-central1 --format 'value(status.url)'
Write-Host "Backend deployed at: $BackendUrl"

# 2. Frontend Deployment
Write-Host "Building and Deploying Frontend..."
Set-Location ..\frontend

# Build the frontend with the backend URL as an environment variable
gcloud builds submit --config cloudbuild.yaml --substitutions=_API_URL=$BackendUrl

gcloud run deploy sentinel-frontend `
    --image gcr.io/$ProjectId/sentinel-frontend `
    --platform managed `
    --region us-central1 `
    --allow-unauthenticated `
    --port 8080

$FrontendUrl = gcloud run services describe sentinel-frontend --platform managed --region us-central1 --format 'value(status.url)'

Set-Location ..

Write-Host "Deployment Complete!"
Write-Host "--------------------------------------------------"
Write-Host "Frontend: $FrontendUrl"
Write-Host "Backend API: $BackendUrl"
Write-Host "--------------------------------------------------"
Write-Host "Next Steps: Update your Firebase Console with the Frontend URL in authorized domains."
