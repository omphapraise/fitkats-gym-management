import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

const PLANS = [
  {
    tier: 'Student',
    price: 349,
    features: ['Off-peak access', 'Group classes', 'Locker access'],
    color: 'border-white/10',
  },
  {
    tier: 'Job Seeker',
    price: 279,
    features: ['Off-peak access', '2 classes / week', 'Community events'],
    color: 'border-white/10',
  },
  {
    tier: 'Middle Class',
    price: 599,
    features: ['Full access', 'Unlimited classes', 'Guest passes'],
    color: 'border-accent/30',
    popular: true,
  },
  {
    tier: 'Premium',
    price: 999,
    features: ['24/7 access', 'Personal training', 'Recovery suite', 'AI Coach'],
    color: 'border-gold/30',
  },
];

export function MembershipPreview() {
  return (
    <section className="py-28 px-6 bg-base-900/50">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="Memberships"
          title="A tier for every stage of your journey"
          subtitle="Pricing that reflects real life — not a one-size-fits-all subscription."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.tier}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Card className={`h-full border ${plan.color} relative`} hover>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge variant="accent">Most Popular</Badge>
                  </div>
                )}
                <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wide mb-3">
                  {plan.tier}
                </h3>
                <div className="mb-6">
                  <span className="text-3xl font-bold text-white">R{plan.price}</span>
                  <span className="text-sm text-white/40">/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-white/60">
                      <Check size={15} className="text-success shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to="/register">
                  <Button variant="secondary" size="sm" fullWidth>
                    Choose Plan
                  </Button>
                </Link>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/memberships" className="inline-flex items-center gap-2 text-sm font-medium text-accent-light hover:text-white transition-colors">
            Compare all membership details
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}