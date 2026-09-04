import { motion } from 'framer-motion';
import { Fingerprint, Activity, Calendar, Trophy, Bot, LineChart } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';

const FEATURES = [
  {
    icon: Fingerprint,
    title: 'Biometric Access',
    description:
      'Enrol once at a structured-light kiosk, then tap in with NFC or your face at every gate.',
    color: 'text-accent-light',
    bg: 'bg-accent/10',
  },
  {
    icon: Activity,
    title: 'Live Recovery Score',
    description:
      'A daily readiness score generated from your recent training load and rest patterns.',
    color: 'text-success',
    bg: 'bg-success/10',
  },
  {
    icon: Calendar,
    title: 'Smart Class Booking',
    description:
      'Reserve a spot in seconds, get waitlisted automatically, and never miss a favourite session.',
    color: 'text-gold-light',
    bg: 'bg-gold/10',
  },
  {
    icon: Bot,
    title: 'AI Coach',
    description:
      'Instant, tailored guidance on form, programming and recovery — available around the clock.',
    color: 'text-accent-light',
    bg: 'bg-accent/10',
  },
  {
    icon: LineChart,
    title: 'Workout Analytics',
    description:
      'Every session logged and visualised, so your progress is always one glance away.',
    color: 'text-success',
    bg: 'bg-success/10',
  },
  {
    icon: Trophy,
    title: 'Rewards Program',
    description:
      'Earn points for consistency and redeem them for merchandise, sessions, and upgrades.',
    color: 'text-gold-light',
    bg: 'bg-gold/10',
  },
];

export function FeatureGrid() {
  return (
    <section className="py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="Platform"
          title="Everything your training needs, in one place"
          subtitle="A calm, considered dashboard that keeps the essentials close and the noise far away."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              <Card hover className="h-full">
                <div
                  className={`w-11 h-11 rounded-2xl ${feature.bg} flex items-center justify-center mb-5`}
                >
                  <feature.icon size={20} className={feature.color} />
                </div>
                <h3 className="text-base font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}