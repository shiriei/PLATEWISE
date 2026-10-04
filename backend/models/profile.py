from sqlalchemy import Column, Integer, String, JSON
from database.database import Base

class UserProfile(Base):
    __tablename__ = "profiles"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    age = Column(Integer)
    dietary_preference = Column(String)
    fitness_goal = Column(String)
    allergies = Column(JSON)
    disliked_foods = Column(JSON)
    meals_per_day = Column(Integer)
    daily_calorie_target = Column(Integer, nullable=True)
