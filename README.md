# PlateWise 🍽️

> **Your plate. Your rules.**

PlateWise is a small AI-powered personalized meal planner that creates meal suggestions based on a user's dietary preferences, fitness goals, allergies, disliked foods, and optional calorie targets.

It uses **Google Gemini** to generate personalized meal plans and a deterministic backend allergy checker to validate generated ingredients before they are shown to the user.

## ✨ Features

- Personalized meal planning
- Dietary preference support
- Fitness goal customization
- Allergy-aware meal generation
- Disliked food preferences
- Optional daily calorie target
- AI-generated meal suggestions using Google Gemini
- Backend allergy validation
- SQLite profile storage
- Simple, responsive editorial/brutalist UI

## 🛠️ Tech Stack

### Frontend

- React
- Vite
- TypeScript
- Tailwind CSS

### Backend

- Python
- FastAPI
- SQLite
- Pydantic

### AI

- Google Gemini API
- `google-genai` Python SDK

## 🏗️ Architecture

```text
┌──────────────────────┐
│    React Frontend    │
│   Vite + TypeScript  │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│    FastAPI Backend   │
└──────────┬───────────┘
           │
     ┌─────┴─────┐
     ▼           ▼
┌─────────┐  ┌─────────────────┐
│ SQLite  │  │  Gemini API     │
│ Profile │  │ Meal Generation │
└─────────┘  └────────┬────────┘
                      │
                      ▼
             ┌─────────────────┐
             │ Allergy Checker │
             └────────┬────────┘
                      │
                      ▼
                Final Meal Plan