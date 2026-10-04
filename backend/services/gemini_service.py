import os
import json
from dotenv import load_dotenv
from google import genai
from pydantic import BaseModel
from typing import List
from schemas.profile import Profile

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
GEMINI_MODEL = os.getenv("GEMINI_MODEL", "gemini-2.5-flash")

class Meal(BaseModel):
    type: str
    name: str
    ingredients: List[str]
    instructions: str
    calories: int
    protein_g: int

class DayPlan(BaseModel):
    day: str
    meals: List[Meal]

class MealPlan(BaseModel):
    days: List[DayPlan]

def generate_meal_plan(profile: Profile) -> MealPlan:
    if not GEMINI_API_KEY:
        raise ValueError("Gemini API key is missing")

    client = genai.Client(api_key=GEMINI_API_KEY)
    
    prompt = f"""You are a personalized meal planning assistant.

Create a practical meal plan based on the user's profile.

Profile Details:
- Age: {profile.age}
- Dietary Preference: {profile.dietary_preference}
- Fitness Goal: {profile.fitness_goal}
- Allergies: {', '.join(profile.allergies) if profile.allergies else 'None'}
- Disliked Foods: {', '.join(profile.disliked_foods) if profile.disliked_foods else 'None'}
- Number of meals per day: {profile.meals_per_day}
- Daily calorie target: {profile.daily_calorie_target if profile.daily_calorie_target else 'No specific target'}

Respect:
- dietary preference
- fitness goal
- allergies
- disliked foods
- number of meals
- optional calorie target

Never intentionally include a listed allergen.
Avoid disliked foods.
Prefer simple, realistic meals.
Return ONLY the requested structured meal-plan data.
Nutrition values are estimates and should not be presented as medical advice.

Generate a single day meal plan exactly matching the {profile.meals_per_day} meals requested.
"""
    try:
        response = client.models.generate_content(
            model=GEMINI_MODEL,
            contents=prompt,
            config={
                "response_mime_type": "application/json",
                "response_schema": MealPlan,
            },
        )
        if not response.text:
            raise Exception("Empty response from Gemini")
            
        plan_dict = json.loads(response.text)
        return MealPlan(**plan_dict)
    except Exception as e:
        raise Exception(f"Failed to generate meal plan: {str(e)}")
