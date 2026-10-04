import sys
from schemas.profile import Profile
from services.gemini_service import generate_meal_plan

profile = Profile(
    id=1,
    name="Test User",
    age=30,
    dietary_preference="Vegan",
    fitness_goal="Weight Loss",
    allergies=["peanuts"],
    disliked_foods=["mushrooms"],
    meals_per_day=3,
    daily_calorie_target=1500
)

try:
    plan = generate_meal_plan(profile)
    print("SUCCESS: Plan Generated")
    for day in plan.days:
        print(f"Day: {day.day}")
        for meal in day.meals:
            print(f"- {meal.type}: {meal.name} ({meal.calories} kcal)")
except Exception as e:
    print(f"ERROR: {e}")
    sys.exit(1)
