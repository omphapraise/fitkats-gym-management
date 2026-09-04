import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Clock, MapPin, User, Check } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { MOCK_CLASSES } from '@/lib/mockData';

const CATEGORIES = ['All', 'HIIT', 'Yoga', 'Cycling', 'Strength', 'Mobility', 'Boxing', 'Pilates'];

export default function ClassesPage() {
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [bookedIds, setBookedIds] = useState<number[]>([1, 4]);

  const filtered = MOCK_CLASSES.filter((c) => {
    const matchesCategory = category === 'All' || c.category === category;
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.instructor.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleBooking = (id: number) => {
    setBookedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <DashboardLayout>
      <DashboardHeader title="Classes" subtitle="Browse and book upcoming sessions" />

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search classes or instructors..."
            className="w-full bg-base-800 border border-base-600 rounded-2xl pl-11 pr-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-accent transition-colors"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                category === cat ? 'bg-white text-base-950' : 'bg-base-800 text-white/50 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((c, i) => {
          const isBooked = bookedIds.includes(c.id);
          const fillPercent = Math.round((c.booked_count / c.capacity) * 100);
          const isFull = c.booked_count >= c.capacity;

          return (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <Card hover className="h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <Badge variant={c.intensity === 'high' ? 'danger' : c.intensity === 'medium' ? 'warning' : 'success'}>
                    {c.intensity} intensity
                  </Badge>
                  <Badge variant="neutral">{c.category}</Badge>
                </div>

                <h3 className="text-base font-semibold text-white mb-3">{c.name}</h3>

                <div className="space-y-2 mb-5 flex-1">
                  <div className="flex items-center gap-2 text-xs text-white/50">
                    <User size={13} /> {c.instructor}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-white/50">
                    <Clock size={13} />
                    {new Date(c.start_time).toLocaleDateString('en-ZA', { weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                    {' · '}{c.duration_minutes} min
                  </div>
                  <div className="flex items-center gap-2 text-xs text-white/50">
                    <MapPin size={13} /> {c.location}
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-xs text-white/40 mb-1.5">
                    <span>{c.booked_count}/{c.capacity} booked</span>
                    <span>{fillPercent}%</span>
                  </div>
                  <div className="h-1.5 bg-base-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${isFull ? 'bg-danger' : fillPercent >= 70 ? 'bg-warning' : 'bg-success'}`}
                      style={{ width: `${Math.min(fillPercent, 100)}%` }}
                    />
                  </div>
                </div>

                <Button
                  variant={isBooked ? 'secondary' : isFull ? 'ghost' : 'primary'}
                  size="sm"
                  fullWidth
                  onClick={() => toggleBooking(c.id)}
                  disabled={isFull && !isBooked}
                  icon={isBooked ? <Check size={14} /> : undefined}
                >
                  {isBooked ? 'Booked' : isFull ? 'Join Waitlist' : 'Book Class'}
                </Button>
              </Card>
            </motion.div>
          );
        })}
        {filtered.length === 0 && (
          <p className="col-span-full text-center text-sm text-white/30 py-16">
            No classes match your search.
          </p>
        )}
      </div>
    </DashboardLayout>
  );
}