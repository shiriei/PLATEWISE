# PlateWise

PlateWise is an AI-powered personalized meal planner built with a modern, brutalist aesthetic.

## Features

- Personalized meal planning
- Dietary preferences
- Fitness goals
- Allergy-aware meal generation
- Disliked food preferences
- Gemini-powered recommendations
- Local SQLite profile storage

## Tech Stack

**Frontend:**
- React
- Vite
- TypeScript
- Tailwind CSS

**Backend:**
- FastAPI
- Python
- SQLite

**AI:**
- Google Gemini API

## Architecture

React -> FastAPI -> SQLite + Profile -> Gemini API -> Allergy Checker -> Meal Plan

## Setup

### Backend Environment Setup

Create `backend/.env` with your Gemini API key and preferred model:

```env
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-2.5-flash
```

**⚠️ IMPORTANT:** Do NOT commit your `.env` file to version control. It is currently ignored in `.gitignore`.

### Start the Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment (Windows):
   ```bash
   python -m venv venv
   .\venv\Scripts\Activate.ps1
   ```
3. Install dependencies:
   ```bash
   pip install fastapi uvicorn sqlalchemy httpx pytest python-dotenv google-genai
   ```
4. Start the backend server:
   ```bash
   uvicorn main:app --reload
   ```

### Start the Frontend

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Important Safety Note

PlateWise provides AI-generated meal suggestions and is not a substitute for professional medical or dietary advice. Users with serious food allergies should independently verify ingredients and food preparation.

## Project Structure

```
platewise/
├── backend/
│   ├── database/
│   ├── models/
│   ├── schemas/
│   ├── services/
│   └── tests/
├── frontend/
│   ├── public/
│   └── src/
│       └── components/
└── README.md
```
