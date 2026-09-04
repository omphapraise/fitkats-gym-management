import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, Fingerprint } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export function Hero() {
  return (
    <section className="relative pt-40 pb-32 overflow-hidden">
      <div
        className="absolute inset-0 grid-mask opacity-40"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px]" />

      <div className="relative max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-8"
        >
          <Badge variant="accent" icon={<Fingerprint size={13} />}>
            Biometric Access Now Live in Sandton
          </Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.05] text-gradient"
        >
          Premium fitness,
          <br />
          <span className="text-gradient-accent">built around you.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-7 text-lg text-white/50 max-w-xl mx-auto leading-relaxed"
        >
          Tiered memberships, tailored dashboards, and a training experience
          that feels engineered for the way you actually live.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link to="/register">
            <Button variant="primary" size="lg" icon={<ArrowRight size={18} />}>
              Start Your Journey
            </Button>
          </Link>
          <Link to="/memberships">
            <Button variant="secondary" size="lg" icon={<Play size={16} />}>
              Explore Memberships
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 relative"
        >
          <div className="glass rounded-4xl p-3 shadow-card max-w-4xl mx-auto">
            <div className="rounded-3xl bg-base-900 aspect-[16/9] flex items-center justify-center overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-gold/10" />
              <div className="relative z-10 grid grid-cols-3 gap-6 p-10 w-full">
                {[
                  { label: 'Recovery Score', value: '87', suffix: '%', color: 'text-success' },
                  { label: 'Gym Capacity', value: '42', suffix: '%', color: 'text-accent-light' },
                  { label: 'Weekly Streak', value: '5', suffix: ' days', color: 'text-gold-light' },
                ].map((stat) => (
                  <div key={stat.label} className="glass rounded-2xl p-5 animate-float">
                    <p className="text-xs text-white/40 mb-2">{stat.label}</p>
                    <p className={`text-3xl font-bold ${stat.color}`}>
                      {stat.value}
                      <span className="text-lg">{stat.suffix}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}