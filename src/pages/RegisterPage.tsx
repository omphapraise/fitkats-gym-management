import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, ArrowRight, Check, Dumbbell } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useAuth } from '@/context/AuthContext';
import { MembershipTier } from '@/types';

const TIERS: { value: MembershipTier; label: string; price: number }[] = [
  { value: 'student', label: 'Student', price: 349 },
  { value: 'job_seeker', label: 'Job Seeker', price: 279 },
  { value: 'middle_class', label: 'Middle Class', price: 599 },
  { value: 'premium', label: 'Premium', price: 999 },
];

export default function RegisterPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { register } = useAuth();
  const preselectedTier = (location.state as { tier?: MembershipTier } | null)?.tier;

  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    password: '',
    confirm_password: '',
    membership_tier: preselectedTier ?? ('middle_class' as MembershipTier),
  });

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    setError('');
    if (step === 1) {
      if (!form.first_name || !form.last_name || !form.email) {
        setError('Please fill in all required fields.');
        return;
      }
    }
    if (step === 2) {
      if (form.password.length < 6) {
        setError('Password must be at least 6 characters.');
        return;
      }
      if (form.password !== form.confirm_password) {
        setError('Passwords do not match.');
        return;
      }
    }
    setStep((s) => s + 1);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    const result = await register(form);
    setLoading(false);
    if (result.success) {
      navigate('/login', { state: { registered: true } });
    } else {
      setError(result.message ?? 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-base-950 flex items-center justify-center px-6 py-16">
      <div
        className="absolute inset-0 grid-mask opacity-30"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-lg"
      >
        <Link to="/" className="flex items-center justify-center gap-2.5 mb-8">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent to-accent-light flex items-center justify-center">
            <Dumbbell size={18} className="text-white" strokeWidth={2.5} />
          </div>
          <span className="text-lg font-bold tracking-tight">Fit Kats</span>
        </Link>

        <div className="glass rounded-4xl p-9 shadow-card">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-white mb-1">Create your account</h1>
              <p className="text-sm text-white/40">Step {step} of 3</p>
            </div>
            <Badge variant="accent">{TIERS.find((t) => t.value === form.membership_tier)?.label}</Badge>
          </div>

          <div className="flex gap-2 mb-9">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-1 flex-1 rounded-full transition-colors ${
                  s <= step ? 'bg-accent' : 'bg-base-700'
                }`}
              />
            ))}
          </div>

          {error && (
            <div className="mb-6 px-4 py-3 rounded-2xl bg-danger/10 border border-danger/20 text-sm text-danger">
              {error}
            </div>
          )}

          {step === 1 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-white/50 mb-2 block">First Name</label>
                  <input
                    type="text"
                    value={form.first_name}
                    onChange={(e) => updateField('first_name', e.target.value)}
                    className="w-full bg-base-800 border border-base-600 rounded-2xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-accent transition-colors"
                    placeholder="Thabo"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-white/50 mb-2 block">Last Name</label>
                  <input
                    type="text"
                    value={form.last_name}
                    onChange={(e) => updateField('last_name', e.target.value)}
                    className="w-full bg-base-800 border border-base-600 rounded-2xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-accent transition-colors"
                    placeholder="Mahlangu"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-white/50 mb-2 block">Email Address</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  className="w-full bg-base-800 border border-base-600 rounded-2xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-accent transition-colors"
                  placeholder="thabo@example.com"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-white/50 mb-2 block">Phone Number</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                  className="w-full bg-base-800 border border-base-600 rounded-2xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-accent transition-colors"
                  placeholder="082 123 4567"
                />
              </div>
              <Button variant="primary" fullWidth size="lg" onClick={handleNext} icon={<ArrowRight size={17} />} className="mt-2">
                Continue
              </Button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <div>
                <label className="text-xs font-medium text-white/50 mb-2 block">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={form.password}
                    onChange={(e) => updateField('password', e.target.value)}
                    className="w-full bg-base-800 border border-base-600 rounded-2xl px-4 py-3 pr-11 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-accent transition-colors"
                    placeholder="At least 6 characters"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-white/50 mb-2 block">Confirm Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={form.confirm_password}
                  onChange={(e) => updateField('confirm_password', e.target.value)}
                  className="w-full bg-base-800 border border-base-600 rounded-2xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-accent transition-colors"
                  placeholder="Re-enter your password"
                />
              </div>
              <div className="flex gap-3 mt-2">
                <Button variant="secondary" size="lg" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button variant="primary" fullWidth size="lg" onClick={handleNext} icon={<ArrowRight size={17} />}>
                  Continue
                </Button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
              <p className="text-xs font-medium text-white/50 mb-1">Choose your membership tier</p>
              {TIERS.map((tier) => (
                <div
                  key={tier.value}
                  onClick={() => updateField('membership_tier', tier.value)}
                  className={`flex items-center justify-between px-5 py-4 rounded-2xl border cursor-pointer transition-colors ${
                    form.membership_tier === tier.value
                      ? 'border-accent bg-accent/10'
                      : 'border-base-600 bg-base-800 hover:border-base-500'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        form.membership_tier === tier.value ? 'border-accent bg-accent' : 'border-white/20'
                      }`}
                    >
                      {form.membership_tier === tier.value && <Check size={12} className="text-white" />}
                    </div>
                    <span className="text-sm font-medium text-white">{tier.label}</span>
                  </div>
                  <span className="text-sm text-white/40">R{tier.price}/mo</span>
                </div>
              ))}
              <div className="flex gap-3 mt-4">
                <Button variant="secondary" size="lg" onClick={() => setStep(2)}>
                  Back
                </Button>
                <Button
                  variant="primary"
                  fullWidth
                  size="lg"
                  onClick={handleSubmit}
                  disabled={loading}
                  icon={<ArrowRight size={17} />}
                >
                  {loading ? 'Creating Account...' : 'Create Account'}
                </Button>
              </div>
            </motion.div>
          )}

          <p className="text-center text-sm text-white/40 mt-8">
            Already have an account?{' '}
            <Link to="/login" className="text-accent-light font-medium hover:text-white transition-colors">
              Log in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}