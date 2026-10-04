from services.allergy_checker import check_allergies

def test_detect_allergen():
    res = check_allergies(["peanuts"], ["salt", "peanut butter", "sugar"])
    assert res["safe"] is False
    assert len(res["warnings"]) == 1

def test_case_insensitive_detection():
    res = check_allergies(["Shellfish"], ["shrimp"])
    assert res["safe"] is False
    
    res2 = check_allergies(["PEANUT"], ["Peanuts"])
    assert res2["safe"] is False

def test_no_allergen_present():
    res = check_allergies(["peanuts", "shellfish"], ["chicken", "rice", "broccoli"])
    assert res["safe"] is True
    assert len(res["warnings"]) == 0
