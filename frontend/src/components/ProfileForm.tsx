import React, { useState, useEffect } from 'react';
import { Button } from './Button';

interface ProfileData {
  name: string;
  age: number;
  dietary_preference: string;
  fitness_goal: string;
  allergies: string[];
  disliked_foods: string[];
  meals_per_day: number;
  daily_calorie_target?: number;
}

export function ProfileForm({ onSave }: { onSave?: () => void }) {
  const [data, setData] = useState<ProfileData>({
    name: '',
    age: 20,
    dietary_preference: 'Vegetarian',
    fitness_goal: 'Maintenance',
    allergies: [],
    disliked_foods: [],
    meals_per_day: 3,
  });

  const [allergyInput, setAllergyInput] = useState('');
  const [dislikedInput, setDislikedInput] = useState('');
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/profile')
      .then(res => {
        if (res.ok) return res.json();
        throw new Error('No profile yet');
      })
      .then(profile => setData(profile))
      .catch(() => { /* Normal if no profile */ });
  }, []);

  const handleAddTag = (field: 'allergies' | 'disliked_foods', value: string, setter: (val: string) => void) => {
    if (!value.trim()) return;
    setData(prev => ({
      ...prev,
      [field]: [...prev[field], value.trim()]
    }));
    setter('');
  };

  const handleRemoveTag = (field: 'allergies' | 'disliked_foods', index: number) => {
    setData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('saving');
    setErrorMsg('');
    try {
      const res = await fetch('http://127.0.0.1:8000/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error('Failed to save profile');
      setStatus('saved');
    } catch (err: any) {
      setStatus('error');
      setErrorMsg('Something went wrong while saving your profile. Please check if the server is running and try again.');
    }
  };

  if (status === 'saved') {
    return (
      <div className="flex flex-col items-center justify-center p-12 border-4 border-brand-text bg-white shadow-[8px_8px_0px_0px_rgba(16,24,23,1)]">
        <h2 className="font-montserrat font-black text-4xl text-brand-green mb-6 uppercase tracking-wide">
          PROFILE SAVED ✓
        </h2>
        <Button onClick={() => {
          setStatus('idle');
          if (onSave) onSave();
        }}>
          CONTINUE →
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="border-4 border-brand-text bg-white p-8 md:p-12 shadow-[8px_8px_0px_0px_rgba(16,24,23,1)]">
      <div className="mb-12 border-b-4 border-brand-text pb-6">
        <h2 className="font-montserrat font-black text-3xl md:text-4xl text-brand-text uppercase mb-2">BUILD YOUR PLATE</h2>
        <p className="font-inter font-bold text-brand-text opacity-70">Tell us what works for you.</p>
      </div>

      {status === 'error' && (
        <div className="bg-brand-red text-white font-bold p-6 mb-8 border-4 border-brand-text">
          <h3 className="font-montserrat font-black text-xl mb-2 uppercase">WE COULDN'T SAVE YOUR PROFILE</h3>
          <p>{errorMsg}</p>
        </div>
      )}

      <div className="space-y-8">
        <div>
          <label htmlFor="nameInput" className="block font-montserrat font-black text-xl mb-2 uppercase">Name</label>
          <input 
            id="nameInput"
            type="text" 
            value={data.name} 
            onChange={e => setData({...data, name: e.target.value})}
            className="w-full border-4 border-brand-text p-4 font-inter font-bold focus:outline-none focus:bg-brand-bg transition-colors"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label htmlFor="ageInput" className="block font-montserrat font-black text-xl mb-2 uppercase">Age</label>
            <input 
              id="ageInput"
              type="number" 
              value={data.age || ''} 
              onChange={e => setData({...data, age: parseInt(e.target.value)})}
              className="w-full border-4 border-brand-text p-4 font-inter font-bold focus:outline-none focus:bg-brand-bg"
              min="1"
              required
            />
          </div>
          <div>
            <label htmlFor="mealsInput" className="block font-montserrat font-black text-xl mb-2 uppercase">Meals Per Day</label>
            <input 
              id="mealsInput"
              type="number" 
              value={data.meals_per_day || ''} 
              onChange={e => setData({...data, meals_per_day: parseInt(e.target.value)})}
              className="w-full border-4 border-brand-text p-4 font-inter font-bold focus:outline-none focus:bg-brand-bg"
              min="1" max="6"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label htmlFor="dietInput" className="block font-montserrat font-black text-xl mb-2 uppercase">Diet</label>
            <select 
              id="dietInput"
              value={data.dietary_preference} 
              onChange={e => setData({...data, dietary_preference: e.target.value})}
              className="w-full border-4 border-brand-text p-4 font-inter font-bold appearance-none bg-white focus:outline-none focus:bg-brand-bg cursor-pointer"
            >
              <option>Vegetarian</option>
              <option>Non-Vegetarian</option>
              <option>Vegan</option>
            </select>
          </div>
          <div>
            <label htmlFor="goalInput" className="block font-montserrat font-black text-xl mb-2 uppercase">Goal</label>
            <select 
              id="goalInput"
              value={data.fitness_goal} 
              onChange={e => setData({...data, fitness_goal: e.target.value})}
              className="w-full border-4 border-brand-text p-4 font-inter font-bold appearance-none bg-white focus:outline-none focus:bg-brand-bg cursor-pointer"
            >
              <option>Weight Loss</option>
              <option>Weight Gain</option>
              <option>Maintenance</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="allergyInput" className="block font-montserrat font-black text-xl mb-2 uppercase">Allergies</label>
          <div className="flex gap-2 mb-4 flex-wrap">
            {data.allergies.map((item, idx) => (
              <span key={idx} className="bg-brand-yellow border-2 border-brand-text px-3 py-1 font-inter font-bold flex items-center gap-2">
                {item}
                <button type="button" aria-label={`Remove ${item}`} onClick={() => handleRemoveTag('allergies', idx)} className="text-brand-red font-black hover:scale-110 cursor-pointer">×</button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input 
              id="allergyInput"
              type="text" 
              value={allergyInput} 
              onChange={e => setAllergyInput(e.target.value)}
              onKeyDown={e => { if(e.key === 'Enter') { e.preventDefault(); handleAddTag('allergies', allergyInput, setAllergyInput); } }}
              className="flex-grow border-4 border-brand-text p-3 font-inter font-bold focus:outline-none"
              placeholder="e.g. Peanut"
            />
            <Button type="button" variant="secondary" onClick={() => handleAddTag('allergies', allergyInput, setAllergyInput)} className="py-3 px-6">
              + ADD
            </Button>
          </div>
        </div>

        <div>
          <label htmlFor="dislikeInput" className="block font-montserrat font-black text-xl mb-2 uppercase">Foods I Don't Like</label>
          <div className="flex gap-2 mb-4 flex-wrap">
            {data.disliked_foods.map((item, idx) => (
              <span key={idx} className="bg-brand-bg border-2 border-brand-text px-3 py-1 font-inter font-bold flex items-center gap-2">
                {item}
                <button type="button" aria-label={`Remove ${item}`} onClick={() => handleRemoveTag('disliked_foods', idx)} className="text-brand-red font-black hover:scale-110 cursor-pointer">×</button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input 
              id="dislikeInput"
              type="text" 
              value={dislikedInput} 
              onChange={e => setDislikedInput(e.target.value)}
              onKeyDown={e => { if(e.key === 'Enter') { e.preventDefault(); handleAddTag('disliked_foods', dislikedInput, setDislikedInput); } }}
              className="flex-grow border-4 border-brand-text p-3 font-inter font-bold focus:outline-none"
              placeholder="e.g. Mushrooms"
            />
            <Button type="button" variant="secondary" onClick={() => handleAddTag('disliked_foods', dislikedInput, setDislikedInput)} className="py-3 px-6">
              + ADD
            </Button>
          </div>
        </div>

        <div>
          <label htmlFor="calorieInput" className="block font-montserrat font-black text-xl mb-2 uppercase">Daily Calorie Target <span className="text-sm opacity-50 text-brand-text font-inter">(Optional)</span></label>
          <input 
            id="calorieInput"
            type="number" 
            value={data.daily_calorie_target || ''} 
            onChange={e => setData({...data, daily_calorie_target: parseInt(e.target.value) || undefined})}
            className="w-full border-4 border-brand-text p-4 font-inter font-bold focus:outline-none focus:bg-brand-bg"
            min="1"
            placeholder="e.g. 2000"
          />
        </div>

      </div>

      <div className="mt-12 pt-8 border-t-4 border-brand-text flex justify-end">
        <Button type="submit" disabled={status === 'saving'}>
          {status === 'saving' ? 'SAVING...' : 'SAVE MY PROFILE →'}
        </Button>
      </div>
    </form>
  );
}
