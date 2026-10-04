from typing import List, Dict, Any

def normalize_allergen(allergen: str) -> List[str]:
    allergen = allergen.lower().strip()
    if allergen in ["peanut", "peanuts", "peanut butter"]:
        return ["peanut", "peanuts", "peanut butter"]
    if allergen in ["shellfish", "shrimp", "prawns", "crab", "lobster"]:
        return ["shellfish", "shrimp", "prawns", "crab", "lobster"]
    if allergen.endswith('s'):
        return [allergen, allergen[:-1]]
    return [allergen, allergen + 's']

def check_allergies(user_allergies: List[str], ingredients: List[str]) -> Dict[str, Any]:
    if not user_allergies:
        return {"safe": True, "warnings": []}
        
    warnings = []
    normalized_user_allergies = []
    for ua in user_allergies:
        normalized_user_allergies.extend(normalize_allergen(ua))
        
    normalized_ingredients = [ing.lower().strip() for ing in ingredients]
    
    for ing in normalized_ingredients:
        for allergen in normalized_user_allergies:
            if allergen in ing or ing in allergen:
                warnings.append(f"Possible allergen detected: {ing}")
                break
                
    warnings = list(set(warnings))
                
    return {
        "safe": len(warnings) == 0,
        "warnings": warnings
    }
