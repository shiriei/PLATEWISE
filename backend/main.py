from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from database.database import engine, get_db
from models import profile as profile_models
from schemas import profile as profile_schemas
from services.gemini_service import generate_meal_plan
from services.allergy_checker import check_allergies

profile_models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="PlateWise API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
def health_check():
    return {"status": "ok"}

@app.get("/api/profile", response_model=profile_schemas.Profile)
def get_profile(db: Session = Depends(get_db)):
    db_profile = db.query(profile_models.UserProfile).filter(profile_models.UserProfile.id == 1).first()
    if db_profile is None:
        raise HTTPException(status_code=404, detail="Profile not found")
    return db_profile

@app.post("/api/profile", response_model=profile_schemas.Profile)
def create_or_update_profile(profile: profile_schemas.ProfileCreate, db: Session = Depends(get_db)):
    db_profile = db.query(profile_models.UserProfile).filter(profile_models.UserProfile.id == 1).first()
    profile_data = profile.model_dump()
    if db_profile:
        for key, value in profile_data.items():
            setattr(db_profile, key, value)
        db.commit()
        db.refresh(db_profile)
        return db_profile
    else:
        new_profile = profile_models.UserProfile(id=1, **profile_data)
        db.add(new_profile)
        db.commit()
        db.refresh(new_profile)
        return new_profile

@app.post("/api/generate-meal-plan")
def generate_plan(db: Session = Depends(get_db)):
    # 1. Load Profile
    db_profile = db.query(profile_models.UserProfile).filter(profile_models.UserProfile.id == 1).first()
    if db_profile is None:
        raise HTTPException(status_code=404, detail="Profile not found. Please create a profile first.")
    
    profile = profile_schemas.Profile.model_validate(db_profile)
    
    try:
        # 2. Call Gemini
        meal_plan = generate_meal_plan(profile)
        
        # 3. Allergy Checker
        validated_days = []
        for day in meal_plan.days:
            validated_meals = []
            for meal in day.meals:
                allergy_result = check_allergies(profile.allergies, meal.ingredients)
                validated_meals.append({
                    "type": meal.type,
                    "name": meal.name,
                    "ingredients": meal.ingredients,
                    "instructions": meal.instructions,
                    "calories": meal.calories,
                    "protein_g": meal.protein_g,
                    "safe": allergy_result["safe"],
                    "warnings": allergy_result["warnings"]
                })
            validated_days.append({
                "day": day.day,
                "meals": validated_meals
            })
            
        # Optional Retry logic
        is_completely_safe = all(m["safe"] for d in validated_days for m in d["meals"])
        if not is_completely_safe:
            try:
                new_meal_plan = generate_meal_plan(profile)
                new_validated_days = []
                for day in new_meal_plan.days:
                    new_validated_meals = []
                    for meal in day.meals:
                        allergy_result = check_allergies(profile.allergies, meal.ingredients)
                        new_validated_meals.append({
                            "type": meal.type,
                            "name": meal.name,
                            "ingredients": meal.ingredients,
                            "instructions": meal.instructions,
                            "calories": meal.calories,
                            "protein_g": meal.protein_g,
                            "safe": allergy_result["safe"],
                            "warnings": allergy_result["warnings"]
                        })
                    new_validated_days.append({
                        "day": day.day,
                        "meals": new_validated_meals
                    })
                validated_days = new_validated_days
            except Exception:
                pass # Fallback to the first generated plan if retry fails

        return {"days": validated_days}

    except ValueError as ve:
        raise HTTPException(status_code=500, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=500, detail="Gemini API is unavailable or returned invalid data.")
