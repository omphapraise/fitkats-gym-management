import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar,
} from 'recharts';
import { Flame, Heart, Clock, TrendingUp, Plus, Dumbbell, Target, Sparkles } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { MOCK_WORKOUTS } from '@/lib/mockData';
import { useAuth } from '@/context/AuthContext';
import { getUserData } from '@/lib/userStorage';
import { getPlan, GOALS } from '@/lib/workoutPlans';

const DEMO_EMAILS = ['member@fitkats.co.za', 'staff@fitkats.co.za', 'manager@fitkats.co.za'];

export default function WorkoutProgressPage() {
  const { user } = useAuth();
  const isDemoAccount = user ? DEMO_EMAILS.includes(user.email.toLowerCase()) : false;
  const userData = user ? getUserData(user.email) : null;

  // ============ NEW / REAL USER VIEW — shows assigned plan, no fake history ============
  if (!isDemoAccount) {
    const planAssignment = userData?.workoutPlan;

    if (!planAssignment) {
      return (
        <DashboardLayout>
          <DashboardHeader title="Workout Progress" subtitle="Your training plan and history" />
          <Card className="text-center py-16">
            <Dumbbell size={32} className="text-white/20 mx-auto mb-4" />
            <p className="text-white/50 mb-6">You haven't set up a workout plan yet.</p>
            <Link to="/dashboard/setup-plan">
              <Button variant="primary" size="sm">Set Up My Plan</Button>
            </Link>
          </Card>
        </DashboardLayout>
      );
    }

    const isPremium = user?.membership_tier === 'premium';
    const fullPlan = getPlan(planAssignment.goal, planAssignment.daysPerWeek, isPremium);
    const goalLabel = GOALS.find((g) => g.value === planAssignment.goal)?.label ?? planAssignment.goal;

    return (
      <DashboardLayout>
        <DashboardHeader title="Workout Progress" subtitle="Your assigned training plan" />

        <Card className="mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-[100px]" />
          <div className="relative flex items-center justify-between flex-wrap gap-6 mb-2">
            <div>
              <p className="text-sm text-white/40 mb-2">Your Active Plan</p>
              <h2 className="text-2xl font-bold text-white mb-3">{fullPlan.name}</h2>
              <div className="flex items-center gap-3 flex-wrap">
                <Badge variant="accent" icon={<Target size={12} />}>{goalLabel}</Badge>
                <Badge variant="neutral">{planAssignment.daysPerWeek} days / week</Badge>
                <Badge variant="neutral">{planAssignment.height} · {planAssignment.weight}</Badge>
                {isPremium && <Badge variant="gold" icon={<Sparkles size={11} />}>Phase 3 Enhanced</Badge>}
              </div>
            </div>
            <div className="w-16 h-16 rounded-3xl bg-accent/10 flex items-center justify-center shrink-0">
              <Dumbbell size={26} className="text-accent-light" />
            </div>
          </div>
          <p className="text-sm text-white/40 leading-relaxed mt-4 relative">{fullPlan.description}</p>
        </Card>

        <Card className="mb-8">
          <h3 className="text-base font-semibold text-white mb-2">No sessions logged yet</h3>
          <p className="text-sm text-white/40 mb-6 leading-relaxed">
            Once you start training, your calorie burn, heart rate, and session history will appear here.
          </p>
          <Button variant="primary" size="sm" icon={<Plus size={14} />}>
            Log Your First Workout
          </Button>
        </Card>

        <div className="space-y-4">
          {fullPlan.schedule.map((day, i) => (
            <Card key={i}>
              <div className="flex items-center justify-between mb-5">
                <div>
                  <p className="text-xs text-white/40 mb-1">{day.day}</p>
                  <h3 className="text-base font-semibold text-white">{day.focus}</h3>
                </div>
                <Badge variant="neutral">{day.exercises.length} exercises</Badge>
              </div>
              <div className="space-y-3">
                {day.exercises.map((exItem, j) => (
                  <div key={j} className="p-4 rounded-2xl bg-base-800">
                    <div className="flex items-center justify-between mb-1.5">
                      <p className="text-sm font-medium text-white">{exItem.name}</p>
                      <Badge variant="accent">{exItem.sets}</Badge>
                    </div>
                    <p className="text-xs text-white/40 leading-relaxed">{exItem.cue}</p>
                    <p className="text-[10px] text-white/25 mt-1.5 uppercase tracking-wide">{exItem.muscle}</p>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </DashboardLayout>
    );
  }

  // ============ DEMO ACCOUNT VIEW (rich sample data) ============
  const [workouts] = useState(MOCK_WORKOUTS);

  const chartData = workouts.map((w) => ({
    date: new Date(w.date).toLocaleDateString('en-ZA', { weekday: 'short' }),
    calories: w.calories,
    heartRate: w.avg_heart_rate,
    duration: w.duration_minutes,
  }));

  const totalCalories = workouts.reduce((sum, w) => sum + w.calories, 0);
  const avgHeartRate = Math.round(workouts.reduce((sum, w) => sum + w.avg_heart_rate, 0) / workouts.length);
  const totalMinutes = workouts.reduce((sum, w) => sum + w.duration_minutes, 0);

  return (
    <DashboardLayout>
      <DashboardHeader
        title="Workout Progress"
        subtitle="Your training history and trends"
        actions={
          <Button variant="primary" size="sm" icon={<Plus size={14} />}>
            Log Workout
          </Button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 mb-8">
        <Card>
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs text-white/40">Calories This Week</p>
            <Flame size={16} className="text-warning" />
          </div>
          <p className="text-3xl font-bold text-white">{totalCalories.toLocaleString()}</p>
        </Card>
        <Card>
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs text-white/40">Avg Heart Rate</p>
            <Heart size={16} className="text-danger" />
          </div>
          <p className="text-3xl font-bold text-white">{avgHeartRate} <span className="text-sm text-white/40">bpm</span></p>
        </Card>
        <Card>
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs text-white/40">Active Minutes</p>
            <Clock size={16} className="text-accent-light" />
          </div>
          <p className="text-3xl font-bold text-white">{totalMinutes}</p>
        </Card>
        <Card>
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs text-white/40">Sessions Logged</p>
            <TrendingUp size={16} className="text-success" />
          </div>
          <p className="text-3xl font-bold text-white">{workouts.length}</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-8">
        <Card>
          <h3 className="text-base font-semibold text-white mb-6">Calories Burned</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#212124" />
              <XAxis dataKey="date" stroke="#5a5a60" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#5a5a60" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{ background: '#18181b', border: '1px solid #2c2c30', borderRadius: 16, fontSize: 12 }}
                cursor={{ fill: 'rgba(255,255,255,0.03)' }}
              />
              <Bar dataKey="calories" fill="#ff9f0a" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <h3 className="text-base font-semibold text-white mb-6">Heart Rate Trend</h3>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#212124" />
              <XAxis dataKey="date" stroke="#5a5a60" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#5a5a60" fontSize={12} tickLine={false} axisLine={false} domain={[80, 180]} />
              <Tooltip
                contentStyle={{ background: '#18181b', border: '1px solid #2c2c30', borderRadius: 16, fontSize: 12 }}
              />
              <Line type="monotone" dataKey="heartRate" stroke="#ff453a" strokeWidth={2.5} dot={{ fill: '#ff453a', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card>
        <h3 className="text-base font-semibold text-white mb-6">Session Log</h3>
        <div className="space-y-2">
          {[...workouts].reverse().map((w) => (
            <div key={w.id} className="flex items-center justify-between p-4 rounded-2xl bg-base-800">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-medium text-white">{w.type}</p>
                  <Badge variant="neutral">
                    {new Date(w.date).toLocaleDateString('en-ZA', { weekday: 'short', day: 'numeric', month: 'short' })}
                  </Badge>
                </div>
                {w.notes && <p className="text-xs text-white/40">{w.notes}</p>}
              </div>
              <div className="flex gap-6 text-right">
                <div>
                  <p className="text-sm font-semibold text-white">{w.duration_minutes}m</p>
                  <p className="text-[10px] text-white/30">Duration</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-warning">{w.calories}</p>
                  <p className="text-[10px] text-white/30">kcal</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-danger">{w.avg_heart_rate}</p>
                  <p className="text-[10px] text-white/30">avg bpm</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </DashboardLayout>
  );
}