import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check, ArrowRight, HelpCircle } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

const PLANS = [
  {
    tier: 'student',
    name: 'Student',
    monthly: 349,
    annual: 3350,
    features: ['Off-peak access (6am–4pm)', '2 classes / week', 'Locker access', 'Biometric gate access'],
  },
  {
    tier: 'job_seeker',
    name: 'Job Seeker',
    monthly: 279,
    annual: 2670,
    features: ['Off-peak access (6am–4pm)', '2 classes / week', 'Community events', 'Biometric gate access'],
  },
  {
    tier: 'middle_class',
    name: 'Middle Class',
    monthly: 599,
    annual: 5750,
    popular: true,
    features: ['Full 24/7 access', 'Unlimited classes', '2 guest passes / month', 'AI Coach access'],
  },
  {
    tier: 'premium',
    name: 'Premium',
    monthly: 999,
    annual: 9590,
    features: ['Full 24/7 access', 'Unlimited classes', '4 personal training sessions', 'Recovery suite', 'AI Coach access', 'Priority booking'],
  },
];

const FAQS = [
  {
    q: 'Can I switch tiers later?',
    a: 'Yes — upgrade or downgrade anytime from your dashboard settings. Changes take effect on your next billing cycle.',
  },
  {
    q: 'Is there a joining fee?',
    a: 'No joining fee. Your first month includes a free biometric enrolment session at any Fit Kats location.',
  },
  {
    q: 'What happens if I miss a payment?',
    a: 'Access pauses automatically after a 3-day grace period. Reactivate anytime from your Payments dashboard.',
  },
  {
    q: 'Do annual plans auto-renew?',
    a: 'Yes, annual plans renew automatically 12 months from purchase. You can cancel auto-renew anytime in Settings.',
  },
];

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-base-950">
      <Navbar />
      <main className="pt-40 pb-28 px-6">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center mb-6">
            <Badge variant="accent">Pricing</Badge>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold tracking-tight text-gradient mb-5"
          >
            Simple, honest pricing
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/50"
          >
            No hidden fees. No surprise charges. Save on any tier by paying annually.
          </motion.p>
        </div>

        <div className="flex justify-center mb-16">
          <div className="glass rounded-full p-1 flex items-center gap-1">
            <button
              onClick={() => setAnnual(false)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                !annual ? 'bg-white text-base-950' : 'text-white/50 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
                annual ? 'bg-white text-base-950' : 'text-white/50 hover:text-white'
              }`}
            >
              Annual
              <span className="text-[10px] bg-success/20 text-success px-2 py-0.5 rounded-full">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-28">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.tier}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Card
                className={`h-full flex flex-col border relative ${
                  plan.popular ? 'border-accent/30 ring-1 ring-accent/20' : 'border-white/10'
                }`}
                hover
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge variant="accent">Most Popular</Badge>
                  </div>
                )}
                <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wide mb-4">
                  {plan.name}
                </h3>
                <div className="mb-6">
                  <span className="text-3xl font-bold text-white">
                    R{annual ? Math.round(plan.annual / 12) : plan.monthly}
                  </span>
                  <span className="text-sm text-white/40">/month</span>
                  {annual && (
                    <p className="text-xs text-white/30 mt-1">Billed R{plan.annual} annually</p>
                  )}
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-white/60">
                      <Check size={15} className="text-success shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to="/register" state={{ tier: plan.tier }}>
                  <Button
                    variant={plan.popular ? 'primary' : 'secondary'}
                    size="sm"
                    fullWidth
                    icon={<ArrowRight size={14} />}
                  >
                    Get Started
                  </Button>
                </Link>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto">
          <SectionHeading eyebrow="FAQ" title="Common questions" />
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <Card
                key={faq.q}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="cursor-pointer"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <HelpCircle size={17} className="text-accent-light shrink-0" />
                    <h3 className="text-sm font-semibold text-white">{faq.q}</h3>
                  </div>
                  <motion.span
                    animate={{ rotate: openFaq === i ? 45 : 0 }}
                    className="text-xl text-white/40 shrink-0"
                  >
                    +
                  </motion.span>
                </div>
                <motion.div
                  initial={false}
                  animate={{ height: openFaq === i ? 'auto' : 0, opacity: openFaq === i ? 1 : 0 }}
                  className="overflow-hidden"
                >
                  <p className="text-sm text-white/50 leading-relaxed mt-4 pl-8">{faq.a}</p>
                </motion.div>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}