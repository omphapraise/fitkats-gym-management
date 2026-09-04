import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';

const TESTIMONIALS = [
{
name: 'Naledi K.',
tier: 'Premium Member',
quote:
'The recovery score changed how I plan my week. I finally train with data instead of guesswork.',
},
{
name: 'Tumelo M.',
tier: 'Middle Class Member',
quote:
'Booking classes takes ten seconds. The whole app feels like it was actually designed for people, not a spreadsheet.',
},
{
name: 'Aisha R.',
tier: 'Student Member',
quote:
'Affordable, clean, and the biometric gate means I never fumble for a card at 6am.',
},
];

export function Testimonials() {
return (
<section className="py-28 px-6 bg-base-900/50">
<div className="max-w-7xl mx-auto">
<SectionHeading eyebrow="Members" title="Trusted by people who train seriously" />

<div className="grid grid-cols-1 md:grid-cols-3 gap-5">
{TESTIMONIALS.map((t, i) => (
<motion.div
key={t.name}
initial={{ opacity: 0, y: 24 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, margin: '-60px' }}
transition={{ duration: 0.5, delay: i * 0.1 }}
>
<Card className="h-full">
<div className="flex gap-1 mb-4">
{Array.from({ length: 5 }).map((_, idx) => (
<Star key={idx} size={14} className="fill-gold text-gold" />
))}
</div>
<p className="text-sm text-white/70 leading-relaxed mb-6">"{t.quote}"</p>
<div>
<p className="text-sm font-semibold text-white">{t.name}</p>
<p className="text-xs text-white/40">{t.tier}</p>
</div>
</Card>
</motion.div>
))}
</div>
</div>
</section>
);
}