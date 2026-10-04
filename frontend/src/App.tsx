import { useState } from 'react';
import { Header } from './components/Header';
import { Button } from './components/Button';
import { FeatureCard } from './components/FeatureCard';
import { SectionHeading } from './components/SectionHeading';
import { Footer } from './components/Footer';
import { ProfileForm } from './components/ProfileForm';
import { MealPlanView } from './components/MealPlanView';

function App() {
  const [view, setView] = useState<'home' | 'profile' | 'mealplan'>('home');

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {view === 'home' && (
          <>
            {/* Hero Section */}
            <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto flex flex-col items-start border-b-4 border-brand-text">
              <h1 className="font-montserrat font-black text-6xl md:text-8xl text-brand-text uppercase leading-[1.1] mb-8">
                Your plate.<br />
                <span className="text-brand-red">Your rules.</span>
              </h1>
              <p className="font-inter font-bold text-xl md:text-2xl text-brand-text mb-12 max-w-2xl leading-relaxed">
                Personalized meal plans built around your goals, preferences, and allergies.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <Button onClick={() => setView('mealplan')}>
                  BUILD MY MEAL PLAN →
                </Button>
                <a href="#how-it-works" className="font-inter font-bold text-brand-text uppercase underline decoration-4 underline-offset-4 hover:text-brand-red hover:decoration-brand-red transition-colors cursor-pointer">
                  How it works
                </a>
              </div>
            </section>

            {/* Features Section */}
            <section id="how-it-works" className="py-20 px-6 md:px-12 bg-brand-yellow border-b-4 border-brand-text">
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <FeatureCard 
                    number="01"
                    title="PERSONALIZED"
                    description="Plans based on your goals and preferences."
                  />
                  <FeatureCard 
                    number="02"
                    title="ALLERGY-AWARE"
                    description="Your listed allergies are checked before meals are shown."
                  />
                  <FeatureCard 
                    number="03"
                    title="AI-POWERED"
                    description="Personalized suggestions generated with Gemini."
                  />
                </div>
              </div>
            </section>

            {/* Bottom Section */}
            <section className="py-32 px-6 md:px-12 max-w-4xl mx-auto text-center">
              <SectionHeading>
                Eat smarter.<br />
                Plan better.
              </SectionHeading>
              <p className="font-inter font-bold text-lg md:text-xl text-brand-text mt-8 max-w-2xl mx-auto">
                Stop worrying about what to eat. Let PlateWise handle the planning so you can focus on enjoying your food.
              </p>
              <div className="mt-12">
                <Button variant="secondary" onClick={() => setView('profile')}>
                  GET STARTED
                </Button>
              </div>
            </section>
          </>
        )}

        {view === 'profile' && (
          <section className="py-20 px-6 md:px-12 max-w-4xl mx-auto">
            <Button variant="secondary" onClick={() => setView('home')} className="mb-8 py-2 px-4 text-sm font-black">
              ← BACK
            </Button>
            <ProfileForm onSave={() => setView('mealplan')} />
          </section>
        )}

        {view === 'mealplan' && (
          <section className="py-20 px-6 md:px-12 max-w-4xl mx-auto">
            <Button variant="secondary" onClick={() => setView('home')} className="mb-8 py-2 px-4 text-sm font-black">
              ← BACK
            </Button>
            <MealPlanView onEditProfile={() => setView('profile')} />
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}

export default App;
