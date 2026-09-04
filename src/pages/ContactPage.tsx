import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, Clock, Send, CheckCircle2 } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

const CONTACT_INFO = [
  { icon: MapPin, label: 'Address', value: '142 Rivonia Road, Sandton, Johannesburg' },
  { icon: Phone, label: 'Phone', value: '+27 11 555 0192' },
  { icon: Mail, label: 'Email', value: 'hello@fitkats.co.za' },
  { icon: Clock, label: 'Hours', value: 'Mon–Fri: 5am–10pm · Sat–Sun: 7am–6pm' },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 700));
    setLoading(false);
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-base-950">
      <Navbar />
      <main className="pt-40 pb-28 px-6">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center mb-6">
            <Badge variant="accent">Contact</Badge>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold tracking-tight text-gradient mb-5"
          >
            Let's talk
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/50"
          >
            Questions about memberships, facilities, or partnerships — our team responds within one business day.
          </motion.p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            className="lg:col-span-2 space-y-4"
          >
            {CONTACT_INFO.map((info) => (
              <Card key={info.label} className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-accent/10 flex items-center justify-center shrink-0">
                  <info.icon size={18} className="text-accent-light" />
                </div>
                <div>
                  <p className="text-xs text-white/40 mb-1">{info.label}</p>
                  <p className="text-sm text-white/80">{info.value}</p>
                </div>
              </Card>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            className="lg:col-span-3"
          >
            <Card className="p-8">
              {!sent ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-white/50 mb-2 block">Your Name</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => updateField('name', e.target.value)}
                        className="w-full bg-base-800 border border-base-600 rounded-2xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-accent transition-colors"
                        placeholder="Naledi Khumalo"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-white/50 mb-2 block">Email</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => updateField('email', e.target.value)}
                        className="w-full bg-base-800 border border-base-600 rounded-2xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-accent transition-colors"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-white/50 mb-2 block">Subject</label>
                    <input
                      type="text"
                      required
                      value={form.subject}
                      onChange={(e) => updateField('subject', e.target.value)}
                      className="w-full bg-base-800 border border-base-600 rounded-2xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-accent transition-colors"
                      placeholder="Membership question"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-white/50 mb-2 block">Message</label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => updateField('message', e.target.value)}
                      className="w-full bg-base-800 border border-base-600 rounded-2xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-accent transition-colors resize-none"
                      placeholder="Tell us how we can help..."
                    />
                  </div>
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={loading}
                    icon={<Send size={16} />}
                  >
                    {loading ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10"
                >
                  <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={28} className="text-success" />
                  </div>
                  <h2 className="text-xl font-bold text-white mb-2">Message sent</h2>
                  <p className="text-sm text-white/50">
                    Thanks, {form.name.split(' ')[0] || 'there'} — we'll be in touch within one business day.
                  </p>
                </motion.div>
              )}
            </Card>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}