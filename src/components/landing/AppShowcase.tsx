import { motion } from 'framer-motion';
import { Activity, Flame, Heart, TrendingUp } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function AppShowcase() {
  return (
    <section className="py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="Your Dashboard"
          title="Insight, without the clutter"
          subtitle="Every metric that matters, styled the way your best apps already feel."
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-4"
          >
            {[
              { icon: Heart, label: 'Avg Heart Rate', value: '142 bpm', color: 'text-danger' },
              { icon: Flame, label: 'Calories Burned', value: '620 kcal', color: 'text-warning' },
              { icon: Activity, label: 'Active Minutes', value: '48 min', color: 'text-success' },
              { icon: TrendingUp, label: 'Monthly Progress', value: '+18%', color: 'text-accent-light' },
            ].map((stat) => (
              <div key={stat.label} className="glass rounded-3xl p-5 flex items-center gap-4">
                <div className="w-11 h-11 rounded-2xl bg-white/5 flex items-center justify-center shrink-0">
                  <stat.icon size={19} className={stat.color} />
                </div>
                <div>
                  <p className="text-xs text-white/40">{stat.label}</p>
                  <p className="text-lg font-semibold text-white">{stat.value}</p>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-3"
          >
            <div className="glass rounded-4xl p-8 shadow-card">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <p className="text-xs text-white/40 mb-1">This Week</p>
                  <p className="text-2xl font-bold text-white">Training Volume</p>
                </div>
                <span className="text-2xl font-bold text-success">↑ 12%</span>
              </div>
              <div className="flex items-end gap-3 h-48">
                {[45, 62, 38, 80, 55, 90, 70].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <motion.div
                      initial={{ height: 0 }}
                      whileInView={{ height: `${h}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: i * 0.05 }}
                      className={`w-full rounded-t-xl ${
                        i === 5 ? 'bg-gradient-to-t from-accent to-accent-light' : 'bg-white/10'
                      }`}
                    />
                    <span className="text-[10px] text-white/30">
                      {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}