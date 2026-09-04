import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check, X, ArrowRight } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { MembershipTier } from '@/types';

interface PlanFeature {
  label: string;
  student: boolean;
  job_seeker: boolean;
  middle_class: boolean;
  premium: boolean;
}

const FEATURES: PlanFeature[] = [
  { label: 'Off-peak gym access', student: true, job_seeker: true, middle_class: true, premium: true },
  { label: '24/7 gym access', student: false, job_seeker: false, middle_class: true, premium: true },
  { label: 'Group classes / week', student: true, job_seeker: true, middle_class: true, premium: true },
  { label: 'Unlimited class bookings', student: false, job_seeker: false, middle_class: true, premium: true },
  { label: 'Biometric fast-gate access', student: true, job_seeker: true, middle_class: true, premium: true },
  { label: 'Personal training sessions', student: false, job_seeker: false, middle_class: false, premium: true },
  { label: 'AI Coach access', student: false, job_seeker: false, middle_class: true, premium: true },
  { label: 'Recovery suite access', student: false, job_seeker: false, middle_class: false, premium: true },
  { label: 'Guest passes / month', student: false, job_seeker: false, middle_class: true, premium: true },
  { label: 'Priority booking window', student: false, job_seeker: false, middle_class: false, premium: true },
  { label: 'Rewards points multiplier', student: false, job_seeker: false, middle_class: false, premium: true },
];

const PLAN_META: Record<MembershipTier, { name: string; price: number; blurb: string; color: string }> = {
  student: {
    name: 'Student',
    price: 349,
    blurb: 'For registered students building the habit.',
    color: 'border-white/10',
  },
  job_seeker: {
    name: 'Job Seeker',
    price: 279,
    blurb: 'Affordable access while you get back on your feet.',
    color: 'border-white/10',
  },
  middle_class: {
    name: 'Middle Class',
    price: 599,
    blurb: 'Full access for people training seriously, every week.',
    color: 'border-accent/30',
  },
  premium: {
    name: 'Premium',
    price: 999,
    blurb: 'The complete experience — coaching, recovery, and priority everything.',
    color: 'border-gold/30',
  },
};

const TIERS: MembershipTier[] = ['student', 'job_seeker', 'middle_class', 'premium'];

export default function MembershipsPage() {
  const [selected, setSelected] = useState<MembershipTier>('middle_class');

  return (
    <div className="min-h-screen bg-base-950">
      <Navbar />
      <main className="pt-40 pb-28 px-6">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center mb-6"
          >
            <Badge variant="accent">Memberships</Badge>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold tracking-tight text-gradient mb-5"
          >
            Choose the tier that fits your life
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/50 leading-relaxed"
          >
            Every tier includes biometric access and full member support.
            Upgrade or downgrade anytime from your dashboard.
          </motion.p>
        </div>

        <div className="max-w-7xl mx-auto mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
            {TIERS.map((tier, i) => {
              const meta = PLAN_META[tier];
              const isSelected = selected === tier;
              return (
                <motion.div
                  key={tier}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  <Card
                    onClick={() => setSelected(tier)}
                    className={`h-full cursor-pointer border transition-all ${
                      isSelected ? `${meta.color} ring-1 ring-accent/40` : 'border-white/10'
                    }`}
                    hover
                  >
                    {tier === 'middle_class' && (
                      <div className="mb-3">
                        <Badge variant="accent">Most Popular</Badge>
                      </div>
                    )}
                    <h3 className="text-base font-semibold text-white mb-1">{meta.name}</h3>
                    <p className="text-xs text-white/40 mb-5 leading-relaxed">{meta.blurb}</p>
                    <div className="mb-6">
                      <span className="text-3xl font-bold text-white">R{meta.price}</span>
                      <span className="text-sm text-white/40">/month</span>
                    </div>
                    <Link to="/register" state={{ tier }}>
                      <Button
                        variant={isSelected ? 'primary' : 'secondary'}
                        size="sm"
                        fullWidth
                        icon={<ArrowRight size={14} />}
                      >
                        Choose {meta.name}
                      </Button>
                    </Link>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          <SectionHeading eyebrow="Compare" title="See exactly what each tier unlocks" />

          <Card className="overflow-x-auto">
            <table className="w-full min-w-[720px]">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-xs font-semibold text-white/40 uppercase tracking-wide py-4 px-3">
                    Feature
                  </th>
                  {TIERS.map((tier) => (
                    <th
                      key={tier}
                      className="text-center text-xs font-semibold text-white uppercase tracking-wide py-4 px-3"
                    >
                      {PLAN_META[tier].name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {FEATURES.map((feature, i) => (
                  <tr
                    key={feature.label}
                    className={i % 2 === 0 ? 'bg-white/[0.02]' : ''}
                  >
                    <td className="text-sm text-white/70 py-4 px-3">{feature.label}</td>
                    {TIERS.map((tier) => (
                      <td key={tier} className="text-center py-4 px-3">
                        {feature[tier] ? (
                          <Check size={16} className="text-success mx-auto" />
                        ) : (
                          <X size={16} className="text-white/15 mx-auto" />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}