import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Ruler, Weight, Target, Calendar, Camera, ArrowRight, Lock } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useAuth } from '@/context/AuthContext';
import { GOALS, getPlan } from '@/lib/workoutPlans';
import { completeOnboarding } from '@/lib/userStorage';

export default function OnboardingPlanPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [goal, setGoal] = useState('');
  const [days, setDays] = useState<3 | 5 | null>(null);
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!height || !weight || !goal || !days) {
      setError('Please fill in every field before continuing.');
      return;
    }
    if (!user) return;

    const isPremium = user.membership_tier === 'premium';
    const template = getPlan(goal, days, isPremium);

    completeOnboarding(user.email, {
      planId: template.id,
      planName: template.name,
      daysPerWeek: days,
      goal, // store the raw value (e.g. 'muscle_gain'), not the display label
      height,
      weight,
      assignedAt: new Date().toISOString().slice(0, 10),
    });

    navigate('/dashboard');
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <Badge variant="accent">One Last Step</Badge>
          <h1 className="text-3xl font-bold text-white mt-4 mb-3">Set up your workout plan</h1>
          <p className="text-white/50 leading-relaxed">
            Tell us a bit about yourself and we'll assign you a starter plan.
            You can always change this later from Settings.
          </p>
        </motion.div>

        <Card>
          {error && (
            <div className="mb-6 px-4 py-3 rounded-2xl bg-danger/10 border border-danger/20 text-sm text-danger">
              {error}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 mb-5">
            <div>
              <label className="text-xs font-medium text-white/50 mb-2 flex items-center gap-1.5">
                <Ruler size={13} /> Height
              </label>
              <input
                type="text"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="e.g. 172cm"
                className="w-full bg-base-800 border border-base-600 rounded-2xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-accent transition-colors"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-white/50 mb-2 flex items-center gap-1.5">
                <Weight size={13} /> Weight
              </label>
              <input
                type="text"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="e.g. 68kg"
                className="w-full bg-base-800 border border-base-600 rounded-2xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-accent transition-colors"
              />
            </div>
          </div>

          <div className="mb-5">
            <label className="text-xs font-medium text-white/50 mb-3 flex items-center gap-1.5">
              <Target size={13} /> Desired Physique
            </label>
            <div className="grid grid-cols-2 gap-3">
              {GOALS.map((g) => (
                <button
                  key={g.value}
                  onClick={() => setGoal(g.value)}
                  className={`px-4 py-3 rounded-2xl text-sm font-medium text-left transition-colors border ${
                    goal === g.value
                      ? 'border-accent bg-accent/10 text-white'
                      : 'border-base-600 bg-base-800 text-white/60 hover:border-base-500'
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="text-xs font-medium text-white/50 mb-3 flex items-center gap-1.5">
              <Calendar size={13} /> Training Days per Week
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[3, 5].map((d) => (
                <button
                  key={d}
                  onClick={() => setDays(d as 3 | 5)}
                  className={`px-4 py-3 rounded-2xl text-sm font-medium transition-colors border ${
                    days === d
                      ? 'border-accent bg-accent/10 text-white'
                      : 'border-base-600 bg-base-800 text-white/60 hover:border-base-500'
                  }`}
                >
                  {d} Days / Week
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <label className="text-xs font-medium text-white/50 mb-3 flex items-center gap-1.5">
              <Camera size={13} /> Upload Progress Photo (optional)
            </label>
            <button
              disabled
              className="w-full px-4 py-6 rounded-2xl border-2 border-dashed border-base-600 bg-base-800/50 text-white/30 text-sm flex flex-col items-center gap-2 cursor-not-allowed"
            >
              <Lock size={18} />
              Coming Soon
            </button>
          </div>

          <Button variant="primary" size="lg" fullWidth onClick={handleSubmit} icon={<ArrowRight size={17} />}>
            Generate My Plan
          </Button>
        </Card>
      </div>
    </DashboardLayout>
  );
}