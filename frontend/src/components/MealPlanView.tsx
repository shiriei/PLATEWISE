import { useState } from 'react';
import { Button } from './Button';

interface Meal {
  type: string;
  name: string;
  ingredients: string[];
  instructions: string;
  calories: number;
  protein_g: number;
  safe: boolean;
  warnings: string[];
}

interface DayPlan {
  day: string;
  meals: Meal[];
}

interface MealPlan {
  days: DayPlan[];
}

export function MealPlanView({ onEditProfile }: { onEditProfile: () => void }) {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [plan, setPlan] = useState<MealPlan | null>(null);

  const generatePlan = async () => {
    setLoading(true);
    setErrorMsg('');
    setPlan(null);
    try {
      const res = await fetch('http://127.0.0.1:8000/api/generate-meal-plan', {
        method: 'POST'
      });
      if (!res.ok) {
        throw new Error();
      }
      const data = await res.json();
      setPlan(data);
    } catch (err) {
      setErrorMsg('Something went wrong while creating your meal plan. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-8 border-b-4 border-brand-text pb-4">
        <h2 className="font-montserrat font-black text-3xl md:text-4xl text-brand-text uppercase">MY MEAL PLAN</h2>
        <Button variant="secondary" onClick={onEditProfile} className="py-2 px-4 text-sm font-black">
          EDIT PROFILE
        </Button>
      </div>

      {!plan && !loading && !errorMsg && (
        <div className="text-center py-20 border-4 border-brand-text bg-white shadow-[8px_8px_0px_0px_rgba(16,24,23,1)]">
          <p className="font-inter font-bold text-xl mb-8">Ready to see your personalized meals?</p>
          <Button onClick={generatePlan}>GENERATE MY MEAL PLAN →</Button>
        </div>
      )}

      {errorMsg && !loading && (
        <div className="text-center py-20 border-4 border-brand-text bg-white shadow-[8px_8px_0px_0px_rgba(16,24,23,1)]">
          <h3 className="font-montserrat font-black text-2xl text-brand-red mb-4 uppercase">WE COULDN'T GENERATE YOUR PLAN</h3>
          <p className="font-inter font-bold text-lg mb-8">{errorMsg}</p>
          <Button onClick={generatePlan}>TRY AGAIN →</Button>
        </div>
      )}

      {loading && (
        <div className="text-center py-20 border-4 border-brand-text bg-brand-yellow shadow-[8px_8px_0px_0px_rgba(16,24,23,1)] animate-pulse">
          <h2 className="font-montserrat font-black text-2xl uppercase">PLANNING YOUR PLATE...</h2>
          <p className="font-inter font-bold opacity-70 mt-4">Creating a meal plan around your preferences.</p>
        </div>
      )}

      {plan && !loading && (
        <div className="space-y-12">
          {plan.days.map((day, dIdx) => (
            <div key={dIdx} className="space-y-8">
              {day.meals.map((meal, mIdx) => (
                <div key={mIdx} className="border-4 border-brand-text bg-white shadow-[6px_6px_0px_0px_rgba(16,24,23,1)] p-6 md:p-8 flex flex-col h-full hover:-translate-y-1 hover:shadow-[10px_10px_0px_0px_rgba(16,24,23,1)] transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <span className="font-montserrat font-black text-xl text-brand-text uppercase tracking-widest opacity-50">{meal.type}</span>
                    <div className="text-right">
                      <span className="block font-inter font-bold text-lg">{meal.calories} kcal</span>
                      <span className="block font-inter font-bold text-sm text-brand-green">{meal.protein_g}g protein</span>
                    </div>
                  </div>
                  
                  <h3 className="font-montserrat font-black text-2xl md:text-3xl text-brand-text uppercase mb-6 leading-tight">
                    {meal.name}
                  </h3>

                  {!meal.safe && (
                    <div className="bg-brand-red text-white p-6 mb-8 border-4 border-brand-text shadow-[4px_4px_0px_0px_rgba(16,24,23,1)]" role="alert">
                      <h4 className="font-montserrat font-black text-xl uppercase tracking-wide flex items-center gap-2">
                        <span className="text-2xl">⚠</span> ALLERGY WARNING
                      </h4>
                      <ul className="mt-3 list-disc list-inside font-inter font-bold">
                        {meal.warnings.map((w, i) => <li key={i}>{w}</li>)}
                      </ul>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-auto">
                    <div>
                      <h4 className="font-montserrat font-black text-sm uppercase mb-2 border-b-2 border-brand-text pb-1">Ingredients</h4>
                      <ul className="list-disc list-inside font-inter font-medium text-brand-text space-y-1">
                        {meal.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-montserrat font-black text-sm uppercase mb-2 border-b-2 border-brand-text pb-1">Instructions</h4>
                      <p className="font-inter font-medium text-brand-text leading-relaxed">
                        {meal.instructions}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}

          <div className="text-center pt-8">
            <Button variant="secondary" onClick={generatePlan}>
              REGENERATE PLAN ↺
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
