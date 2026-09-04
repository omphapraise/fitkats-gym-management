import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Flame, Heart, Trophy, Calendar, ArrowRight, Sparkles,
  Send, Bot, Gauge, Dumbbell, CalendarPlus, Target,
} from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/context/AuthContext';
import {
  MOCK_CLASSES, MOCK_BOOKINGS, MOCK_WORKOUTS, MOCK_NOTIFICATIONS,
  getGymCapacity, getRecoveryScore, getAICoachResponse,
} from '@/lib/mockData';
import { getUserData } from '@/lib/userStorage';
import { GOALS } from '@/lib/workoutPlans';

const DEMO_EMAILS = ['member@fitkats.co.za', 'staff@fitkats.co.za', 'manager@fitkats.co.za'];

export default function MemberDashboard() {
  const { user } = useAuth();
  const isPremium = user?.membership_tier === 'premium';
  const isDemoAccount = user ? DEMO_EMAILS.includes(user.email.toLowerCase()) : false;
  const userData = user ? getUserData(user.email) : null;

  const [capacity, setCapacity] = useState(0);
  const [recovery, setRecovery] = useState(0);
  const [coachInput, setCoachInput] = useState('');
  const [coachMessages, setCoachMessages] = useState<{ from: 'user' | 'coach'; text: string }[]>([
    { from: 'coach', text: `Hi ${user?.first_name ?? ''}! Ask me about form, recovery, nutrition, or motivation.` },
  ]);

  useEffect(() => {
    setCapacity(getGymCapacity());
    if (isDemoAccount) setRecovery(getRecoveryScore());
  }, [isDemoAccount]);

  const handleAskCoach = () => {
    if (!coachInput.trim()) return;
    const userMsg = coachInput;
    setCoachMessages((prev) => [...prev, { from: 'user', text: userMsg }]);
    setCoachInput('');
    setTimeout(() => {
      setCoachMessages((prev) => [...prev, { from: 'coach', text: getAICoachResponse(userMsg) }]);
    }, 500);
  };

  // ============ NEW / REAL USER VIEW ============
  if (!isDemoAccount) {
    const plan = userData?.workoutPlan;

    return (
      <DashboardLayout>
        <DashboardHeader
          title="Your Dashboard"
          subtitle={`${user?.membership_tier?.replace('_', ' ')} member since ${new Date(user?.joined_at ?? '').toLocaleDateString('en-ZA', { month: 'long', year: 'numeric' })}`}
        />

        <Card className="mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-[100px]" />
          <div className="relative flex items-center justify-between flex-wrap gap-6">
            <div>
              <p className="text-sm text-white/40 mb-2">Welcome to Fit Kats, {user?.first_name}</p>
              <h2 className="text-2xl font-bold text-white mb-3">
                {plan ? plan.planName : 'No plan assigned yet'}
              </h2>
              {plan && (
                <div className="flex items-center gap-3 flex-wrap">
                  <Badge variant="accent" icon={<Target size={12} />}>
                    {GOALS.find((g) => g.value === plan.goal)?.label ?? plan.goal}
                  </Badge>
                  <Badge variant="neutral">{plan.daysPerWeek} days / week</Badge>
                </div>
              )}
            </div>
            <div className="w-16 h-16 rounded-3xl bg-accent/10 flex items-center justify-center shrink-0">
              <Dumbbell size={26} className="text-accent-light" />
            </div>
          </div>
          <Link to="/dashboard/workout-progress">
            <Button variant="secondary" size="sm" className="mt-6" icon={<ArrowRight size={14} />}>
              View Full Plan
            </Button>
          </Link>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-8">
          <Card>
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs text-white/40">Gym Capacity Right Now</p>
              <Gauge size={16} className={capacity < 40 ? 'text-success' : capacity < 70 ? 'text-warning' : 'text-danger'} />
            </div>
            <p className={`text-3xl font-bold ${capacity < 40 ? 'text-success' : capacity < 70 ? 'text-warning' : 'text-danger'}`}>
              {capacity}%
            </p>
            <p className="text-xs text-white/30 mt-2">Sandton — Main Floor</p>
          </Card>

          <Card className="flex flex-col items-center justify-center text-center py-8">
            <CalendarPlus size={22} className="text-accent-light mb-3" />
            <p className="text-sm font-medium text-white mb-1">No bookings yet</p>
            <p className="text-xs text-white/40 mb-4">Browse classes and book your first session</p>
            <Link to="/dashboard/classes">
              <Button variant="primary" size="sm" icon={<ArrowRight size={13} />}>
                Browse Classes
              </Button>
            </Link>
          </Card>
        </div>

        {isPremium ? (
          <Card>
            <div className="flex items-center gap-2 mb-5">
              <Bot size={18} className="text-accent-light" />
              <h3 className="text-base font-semibold text-white">AI Coach</h3>
              <Badge variant="gold">Premium</Badge>
            </div>
            <div className="space-y-3 mb-4 max-h-64 overflow-y-auto pr-1">
              {coachMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`text-sm p-3 rounded-2xl leading-relaxed ${
                    msg.from === 'coach' ? 'bg-accent/10 text-white/80' : 'bg-base-800 text-white ml-6'
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                value={coachInput}
                onChange={(e) => setCoachInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAskCoach()}
                placeholder="Ask me anything..."
                className="flex-1 bg-base-800 border border-base-600 rounded-2xl px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-accent"
              />
              <button
                onClick={handleAskCoach}
                className="w-10 h-10 rounded-2xl bg-accent flex items-center justify-center shrink-0 hover:bg-accent-light transition-colors"
              >
                <Send size={15} className="text-white" />
              </button>
            </div>
          </Card>
        ) : (
          <Card className="flex flex-col items-center justify-center text-center py-10">
            <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center mb-5">
              <Bot size={24} className="text-gold-light" />
            </div>
            <h3 className="text-base font-semibold text-white mb-2">Unlock AI Coach</h3>
            <p className="text-sm text-white/40 mb-6 leading-relaxed">
              Get instant, personalised training guidance by upgrading to Premium.
            </p>
            <Link to="/pricing">
              <Button variant="gold" size="sm">Upgrade to Premium</Button>
            </Link>
          </Card>
        )}
      </DashboardLayout>
    );
  }

  // ============ DEMO ACCOUNT VIEW (rich sample data) ============
  const upcomingBookings = MOCK_BOOKINGS.filter((b) => b.status !== 'cancelled').slice(0, 3);
  const recentWorkouts = MOCK_WORKOUTS.slice(-4).reverse();
  const unreadNotifications = MOCK_NOTIFICATIONS.filter((n) => !n.read);
  const capacityColor = capacity < 40 ? 'text-success' : capacity < 70 ? 'text-warning' : 'text-danger';

  return (
    <DashboardLayout>
      <DashboardHeader
        title="Your Dashboard"
        subtitle={`${user?.membership_tier?.replace('_', ' ')} member since ${new Date(user?.joined_at ?? '').toLocaleDateString('en-ZA', { month: 'long', year: 'numeric' })}`}
        actions={isPremium ? <Badge variant="gold" icon={<Sparkles size={12} />}>Premium</Badge> : undefined}
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 mb-8">
        <Card>
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs text-white/40">Recovery Score</p>
            <Heart size={16} className="text-danger" />
          </div>
          <p className="text-3xl font-bold text-white">{recovery}%</p>
          <p className="text-xs text-success mt-2">Ready to train</p>
        </Card>
        <Card>
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs text-white/40">Gym Capacity Now</p>
            <Gauge size={16} className={capacityColor} />
          </div>
          <p className={`text-3xl font-bold ${capacityColor}`}>{capacity}%</p>
          <p className="text-xs text-white/30 mt-2">Sandton — Main Floor</p>
        </Card>
        <Card>
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs text-white/40">Reward Points</p>
            <Trophy size={16} className="text-gold-light" />
          </div>
          <p className="text-3xl font-bold text-white">1,240</p>
          <Link to="/dashboard/rewards" className="text-xs text-accent-light mt-2 inline-block">
            Redeem now →
          </Link>
        </Card>
        <Card>
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs text-white/40">Weekly Streak</p>
            <Flame size={16} className="text-warning" />
          </div>
          <p className="text-3xl font-bold text-white">5 days</p>
          <p className="text-xs text-white/30 mt-2">Personal best: 12</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-semibold text-white">Upcoming Bookings</h3>
            <Link to="/dashboard/bookings" className="text-xs text-accent-light flex items-center gap-1">
              View all <ArrowRight size={12} />
            </Link>
          </div>
          <div className="space-y-3">
            {upcomingBookings.map((booking) => (
              <div key={booking.id} className="flex items-center justify-between p-4 rounded-2xl bg-base-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                    <Calendar size={16} className="text-accent-light" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{booking.class_name}</p>
                    <p className="text-xs text-white/40">
                      {new Date(booking.class_time).toLocaleDateString('en-ZA', { weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
                <Badge variant={booking.status === 'confirmed' ? 'success' : 'warning'}>
                  {booking.status}
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="text-base font-semibold text-white mb-6">Notifications</h3>
          <div className="space-y-3">
            {unreadNotifications.map((n) => (
              <div key={n.id} className="p-3 rounded-2xl bg-base-800">
                <p className="text-sm font-medium text-white mb-1">{n.title}</p>
                <p className="text-xs text-white/40 leading-relaxed">{n.message}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
        <Card className="lg:col-span-2">
          <h3 className="text-base font-semibold text-white mb-6">Recent Workouts</h3>
          <div className="space-y-3">
            {recentWorkouts.map((w) => (
              <div key={w.id} className="flex items-center justify-between p-4 rounded-2xl bg-base-800">
                <div>
                  <p className="text-sm font-medium text-white">{w.type}</p>
                  <p className="text-xs text-white/40">{new Date(w.date).toLocaleDateString('en-ZA', { weekday: 'short', day: 'numeric', month: 'short' })}</p>
                </div>
                <div className="flex gap-5 text-right">
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
          <Link to="/dashboard/workout-progress">
            <Button variant="secondary" size="sm" fullWidth className="mt-5" icon={<ArrowRight size={14} />}>
              View Full Progress
            </Button>
          </Link>
        </Card>

        {isPremium ? (
          <Card className="flex flex-col">
            <div className="flex items-center gap-2 mb-5">
              <Bot size={18} className="text-accent-light" />
              <h3 className="text-base font-semibold text-white">AI Coach</h3>
              <Badge variant="gold">Premium</Badge>
            </div>
            <div className="flex-1 space-y-3 mb-4 max-h-64 overflow-y-auto pr-1">
              {coachMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`text-sm p-3 rounded-2xl leading-relaxed ${
                    msg.from === 'coach' ? 'bg-accent/10 text-white/80' : 'bg-base-800 text-white ml-6'
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                value={coachInput}
                onChange={(e) => setCoachInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAskCoach()}
                placeholder="Ask about form, recovery..."
                className="flex-1 bg-base-800 border border-base-600 rounded-2xl px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-accent"
              />
              <button
                onClick={handleAskCoach}
                className="w-10 h-10 rounded-2xl bg-accent flex items-center justify-center shrink-0 hover:bg-accent-light transition-colors"
              >
                <Send size={15} className="text-white" />
              </button>
            </div>
          </Card>
        ) : (
          <Card className="flex flex-col items-center justify-center text-center py-10">
            <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center mb-5">
              <Bot size={24} className="text-gold-light" />
            </div>
            <h3 className="text-base font-semibold text-white mb-2">Unlock AI Coach</h3>
            <p className="text-sm text-white/40 mb-6 leading-relaxed">
              Get instant, personalised training guidance by upgrading to Premium.
            </p>
            <Link to="/pricing">
              <Button variant="gold" size="sm">Upgrade to Premium</Button>
            </Link>
          </Card>
        )}
      </div>

      <Card>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-base font-semibold text-white">Recommended Classes</h3>
          <Link to="/dashboard/classes" className="text-xs text-accent-light flex items-center gap-1">
            View all <ArrowRight size={12} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {MOCK_CLASSES.slice(0, 3).map((c) => (
            <div key={c.id} className="p-4 rounded-2xl bg-base-800">
              <div className="flex items-center justify-between mb-3">
                <Badge variant={c.intensity === 'high' ? 'danger' : c.intensity === 'medium' ? 'warning' : 'success'}>
                  {c.intensity}
                </Badge>
                <span className="text-xs text-white/30">{c.duration_minutes}m</span>
              </div>
              <p className="text-sm font-medium text-white mb-1">{c.name}</p>
              <p className="text-xs text-white/40">{c.instructor} · {c.location}</p>
            </div>
          ))}
        </div>
      </Card>
    </DashboardLayout>
  );
}