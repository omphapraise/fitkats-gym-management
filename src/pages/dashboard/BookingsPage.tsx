import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, X, CheckCircle2, Clock3 } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { MOCK_BOOKINGS, MOCK_CLASSES } from '@/lib/mockData';
import { Booking } from '@/types';

type TabKey = 'upcoming' | 'past' | 'cancelled';

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>(MOCK_BOOKINGS);
  const [tab, setTab] = useState<TabKey>('upcoming');

  const cancelBooking = (id: number) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: 'cancelled' } : b))
    );
  };

  const now = new Date();
  const filtered = bookings.filter((b) => {
    const classDate = new Date(b.class_time);
    if (tab === 'cancelled') return b.status === 'cancelled';
    if (tab === 'past') return classDate < now && b.status !== 'cancelled';
    return classDate >= now && b.status !== 'cancelled';
  });

  const TABS: { key: TabKey; label: string }[] = [
    { key: 'upcoming', label: 'Upcoming' },
    { key: 'past', label: 'Past' },
    { key: 'cancelled', label: 'Cancelled' },
  ];

  return (
    <DashboardLayout>
      <DashboardHeader title="My Bookings" subtitle="Manage your class reservations" />

      <div className="flex gap-2 mb-8">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${
              tab === t.key ? 'bg-white text-base-950' : 'bg-base-800 text-white/50 hover:text-white'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((b, i) => {
          const classInfo = MOCK_CLASSES.find((c) => c.id === b.class_id);
          return (
            <motion.div
              key={b.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              <Card className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center shrink-0">
                    <Calendar size={20} className="text-accent-light" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white mb-1">{b.class_name}</p>
                    <div className="flex items-center gap-4 text-xs text-white/40">
                      <span className="flex items-center gap-1.5">
                        <Clock3 size={12} />
                        {new Date(b.class_time).toLocaleDateString('en-ZA', { weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                      </span>
                      {classInfo && (
                        <span className="flex items-center gap-1.5">
                          <MapPin size={12} /> {classInfo.location}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge
                    variant={
                      b.status === 'confirmed' ? 'success' :
                      b.status === 'waitlisted' ? 'warning' :
                      b.status === 'attended' ? 'accent' : 'danger'
                    }
                    icon={b.status === 'confirmed' ? <CheckCircle2 size={12} /> : undefined}
                  >
                    {b.status}
                  </Badge>
                  {tab === 'upcoming' && (
                    <Button variant="ghost" size="sm" onClick={() => cancelBooking(b.id)} icon={<X size={13} />}>
                      Cancel
                    </Button>
                  )}
                </div>
              </Card>
            </motion.div>
          );
        })}
        {filtered.length === 0 && (
          <p className="text-center text-sm text-white/30 py-16">No {tab} bookings.</p>
        )}
      </div>
    </DashboardLayout>
  );
}