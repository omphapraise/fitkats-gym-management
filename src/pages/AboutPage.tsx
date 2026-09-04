import { motion } from 'framer-motion';
import { Fingerprint, Target, Users, Award } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

const VALUES = [
  {
    icon: Target,
    title: 'Precision Over Guesswork',
    description:
      'Every dashboard metric exists to answer a real training question, not to fill space.',
  },
  {
    icon: Fingerprint,
    title: 'Frictionless Access',
    description:
      'Structured-light enrolment once, then biometric gates every visit after. No cards, no queues.',
  },
  {
    icon: Users,
    title: 'Community, Tiered Fairly',
    description:
      'Four membership tiers priced for real life stages — student to premium — without compromising the experience.',
  },
  {
    icon: Award,
    title: 'Consistency, Rewarded',
    description:
      'Show up, and the system notices. Points, badges, and real perks for real discipline.',
  },
];

const TEAM = [
  { name: 'Amara Botha', role: 'General Manager', initials: 'AB' },
  { name: 'Sipho Ndlovu', role: 'Head of Operations', initials: 'SN' },
  { name: 'Naledi Khumalo', role: 'Lead Trainer', initials: 'NK' },
  { name: 'Chen Wei', role: 'Systems & Access Lead', initials: 'CW' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-base-950">
      <Navbar />
      <main className="pt-40 pb-28">
        <section className="px-6 max-w-5xl mx-auto text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-8"
          >
            <Badge variant="accent">Our Story</Badge>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gradient mb-6"
          >
            Built in Sandton, for people who train with intent.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-white/50 max-w-2xl mx-auto leading-relaxed"
          >
            Fit Kats started as a simple question: why does gym software look
            a decade older than the phone in your pocket? We rebuilt the
            experience from the gate in, using biometric access, honest
            tiered pricing, and a dashboard that actually respects your time.
          </motion.p>
        </section>

        <section className="px-6 max-w-6xl mx-auto mb-28">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { value: '2,400+', label: 'Active Members' },
              { value: '18', label: 'Weekly Classes' },
              { value: '4', label: 'Membership Tiers' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card className="text-center py-10">
                  <p className="text-4xl font-bold text-gradient-accent mb-2">{stat.value}</p>
                  <p className="text-sm text-white/40">{stat.label}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="px-6 max-w-7xl mx-auto mb-28">
          <SectionHeading
            eyebrow="What We Stand For"
            title="Four principles behind every feature"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {VALUES.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Card hover className="h-full flex gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center shrink-0">
                    <value.icon size={20} className="text-accent-light" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white mb-2">{value.title}</h3>
                    <p className="text-sm text-white/50 leading-relaxed">{value.description}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="px-6 max-w-7xl mx-auto">
          <SectionHeading eyebrow="Leadership" title="The team behind Fit Kats" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TEAM.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Card className="text-center" hover>
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent to-accent-light mx-auto mb-4 flex items-center justify-center text-lg font-bold">
                    {member.initials}
                  </div>
                  <h3 className="text-sm font-semibold text-white">{member.name}</h3>
                  <p className="text-xs text-white/40 mt-1">{member.role}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}