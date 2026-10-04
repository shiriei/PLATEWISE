import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from main import app
from database.database import Base, get_db

SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base.metadata.create_all(bind=engine)

def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

client = TestClient(app)

def test_create_profile():
    response = client.post("/api/profile", json={
        "name": "Alex",
        "age": 21,
        "dietary_preference": "Vegetarian",
        "fitness_goal": "Maintenance",
        "allergies": ["peanuts", "shellfish"],
        "disliked_foods": ["mushrooms"],
        "meals_per_day": 3,
        "daily_calorie_target": 2200
    })
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "Alex"
    assert data["id"] == 1

def test_get_profile():
    response = client.get("/api/profile")
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "Alex"

def test_update_profile():
    response = client.post("/api/profile", json={
        "name": "Alexander",
        "age": 22,
        "dietary_preference": "Vegan",
        "fitness_goal": "Weight Loss",
        "allergies": ["peanuts"],
        "disliked_foods": [],
        "meals_per_day": 4,
        "daily_calorie_target": 2000
    })
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "Alexander"
    assert data["age"] == 22
