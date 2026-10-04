from pydantic import BaseModel, Field
from typing import List, Optional

class ProfileBase(BaseModel):
    name: str = Field(..., min_length=1)
    age: int = Field(..., gt=0)
    dietary_preference: str
    fitness_goal: str
    allergies: List[str] = []
    disliked_foods: List[str] = []
    meals_per_day: int = Field(..., ge=1, le=6)
    daily_calorie_target: Optional[int] = Field(None, gt=0)

class ProfileCreate(ProfileBase):
    pass

class Profile(ProfileBase):
    id: int

    class Config:
        from_attributes = True
