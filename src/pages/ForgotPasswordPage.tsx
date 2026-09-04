import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Dumbbell, MailCheck, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { authApi } from '@/lib/api';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email) {
      setError('Please enter your email address.');
      return;
    }
    setLoading(true);
    try {
      await authApi.forgotPassword(email);
    } catch {
      // demo mode — proceed regardless
    }
    setLoading(false);
    setSent(true);
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
        className="relative w-full max-w-md"
      >
        <Link to="/" className="flex items-center justify-center gap-2.5 mb-8">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent to-accent-light flex items-center justify-center">
            <Dumbbell size={18} className="text-white" strokeWidth={2.5} />
          </div>
          <span className="text-lg font-bold tracking-tight">Fit Kats</span>
        </Link>

        <div className="glass rounded-4xl p-9 shadow-card">
          {!sent ? (
            <>
              <h1 className="text-2xl font-bold text-white mb-2">Reset your password</h1>
              <p className="text-sm text-white/40 mb-8">
                Enter the email linked to your account and we'll send a reset link.
              </p>

              {error && (
                <div className="mb-6 px-4 py-3 rounded-2xl bg-danger/10 border border-danger/20 text-sm text-danger">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="text-xs font-medium text-white/50 mb-2 block">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-base-800 border border-base-600 rounded-2xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-accent transition-colors"
                    placeholder="you@example.com"
                  />
                </div>
                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  size="lg"
                  disabled={loading}
                  icon={<ArrowRight size={17} />}
                >
                  {loading ? 'Sending...' : 'Send Reset Link'}
                </Button>
              </form>
            </>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-4">
              <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
                <MailCheck size={28} className="text-success" />
              </div>
              <h2 className="text-xl font-bold text-white mb-2">Check your inbox</h2>
              <p className="text-sm text-white/50 leading-relaxed mb-2">
                If an account exists for
              </p>
              <p className="text-sm text-accent-light font-medium mb-6">{email}</p>
              <p className="text-xs text-white/30">
                A password reset link has been sent. It expires in 30 minutes.
              </p>
            </motion.div>
          )}

          <Link
            to="/login"
            className="flex items-center justify-center gap-2 text-sm text-white/40 hover:text-white transition-colors mt-8 pt-6 border-t border-white/5"
          >
            <ArrowLeft size={14} />
            Back to log in
          </Link>
        </div>
      </motion.div>
    </div>
  );
}