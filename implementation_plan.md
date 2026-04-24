# SentinelID: Implementation Plan

SentinelID is an API-first platform designed to detect deepfakes, fraudulent KYC documents, and AI-generated faces. This plan outlines the development of a production-ready solution utilizing the Google Ecosystem and Material Design 3 aesthetics.

## User Review Required

> [!IMPORTANT]
> **Cloud Environment**: This project assumes deployment on Google Cloud Platform (Cloud Run, GCS, Firestore). Please confirm if you have an active GCP project ID ready.
> [!WARNING]
> **AI Models**: Real-time deepfake detection requires heavy compute. We will optimize models for Cloud Run using ONNX or quantized PyTorch models.
> [!NOTE]
> **Explainability**: The "WOW" factor will be an interactive heatmap overlay on the uploaded image, powered by Grad-CAM and interpreted by Gemini 1.5 Flash.

## Proposed Changes

### Tech Stack & Google Ecosystem
- **Frontend**: Next.js (React) + Tailwind CSS + Framer Motion.
- **Backend**: FastAPI (Python) + PyTorch + FFT.
- **Database**: Firestore (NoSQL) for audit logs and results.
- **Storage**: Google Cloud Storage for media assets.
- **Auth**: Firebase Authentication.
- **AI/ML**: Vertex AI (API calls) + Custom Vision Transformer (ViT) logic.
- **UI Design**: Material Design 3 (Google-style) with a sleek "White/Primary" theme.

---

### Phase 1: Foundation & Design System [NEW]
- [NEW] `frontend/src/styles/design-system.ts`: Define Google-style tokens (Colors: #1A73E8, Shapes: 24px-32px radius, Typography: Inter/Outfit).
- [NEW] `frontend/src/components/shared/Layout.tsx`: Implement the "Google Dashboard" layout with a minimalist sidebar and top bar.

### Phase 2: AI Backend Services [NEW]
- [NEW] `backend/app/main.py`: FastAPI entry point with CORS and standard middleware.
- [NEW] `backend/app/services/fraud_detector.py`: Core logic for:
    - **FFT Analysis**: Detecting GAN artifacts in frequency domain.
    - **ViT Inference**: Running the Vision Transformer model for features.
    - **Explainability**: Generating heatmaps via Grad-CAM.
- [NEW] `backend/app/services/explain_service.py`: Integration with Gemini 1.5 Flash to generate natural language explanations of the fraud signals.

### Phase 3: Sentinel Dashboard [NEW]
- [NEW] `frontend/src/components/dashboard/UploadZone.tsx`: A premium drag-and-drop area with progress animations.
- [NEW] `frontend/src/components/dashboard/ResultViewer.tsx`: The "Wow Factor" visualization showing:
    - AI Confidence Score.
    - Explainability Heatmap Overlay.
    - FFT Spectrum View.
    - Natural language "Verdict" from Gemini.

### Phase 4: Integration & Webhooks [NEW]
- [NEW] `backend/app/services/webhook_service.py`: Logic to push alerts to external business systems.
- [NEW] `backend/app/api/v1/endpoints/detect.py`: Public API for third-party integrations.

---

## Open Questions

- **Specific GCP Project**: Do you have a project ID to use, or should I create a "simulated" local environment first?
- **Dataset**: Should I use a pre-trained model fine-tuned on DFDC (Deepfake Detection Challenge) or a more general anti-spoofing model?
- **Workflow**: Should the "Real-time" aspect be truly instantaneous (blocking) or asynchronous (webhook-based)?

## Verification Plan

### Automated Tests
- `pytest`: For backend AI logic and API endpoints.
- `vitest`: For frontend component rendering.

### Manual Verification
- Uploading a real ID vs. a Photoshop-edited ID to verify detection accuracy.
- Testing the UI responsiveness on mobile and tablet.
- Verifying the "Explainability" heatmap aligns with edited regions.
