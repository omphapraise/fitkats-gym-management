import { useState, useEffect } from 'react';
import { CheckCircle2, Gauge, Clock, Search } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { getGymCapacity } from '@/lib/mockData';

interface CheckIn {
  id: number;
  name: string;
  membership_tier: string;
  time: string;
  method: 'Biometric' | 'NFC' | 'QR';
}

const MOCK_CHECKINS: CheckIn[] = [
  { id: 1, name: 'Lindiwe Mokoena', membership_tier: 'Premium', time: '06:04 AM', method: 'Biometric' },
  { id: 2, name: 'Thabo Mahlangu', membership_tier: 'Student', time: '06:12 AM', method: 'NFC' },
  { id: 3, name: 'Aisha Rahman', membership_tier: 'Middle Class', time: '06:20 AM', method: 'Biometric' },
  { id: 4, name: 'Karabo Sithole', membership_tier: 'Job Seeker', time: '06:31 AM', method: 'QR' },
  { id: 5, name: 'Zanele Nkosi', membership_tier: 'Premium', time: '06:45 AM', method: 'Biometric' },
];

export default function StaffDashboard() {
  const [capacity, setCapacity] = useState(0);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setCapacity(getGymCapacity());
  }, []);

  const filteredCheckins = MOCK_CHECKINS.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const capacityColor = capacity < 40 ? 'text-success' : capacity < 70 ? 'text-warning' : 'text-danger';

  return (
    <DashboardLayout>
      <DashboardHeader title="Staff Dashboard" subtitle="Today's check-ins and live gym capacity" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-8">
        <Card>
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs text-white/40">Live Gym Capacity</p>
            <Gauge size={16} className={capacityColor} />
          </div>
          <p className={`text-3xl font-bold ${capacityColor}`}>{capacity}%</p>
          <p className="text-xs text-white/30 mt-2">Sandton — Main Floor</p>
        </Card>
        <Card>
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs text-white/40">Check-ins Today</p>
            <CheckCircle2 size={16} className="text-success" />
          </div>
          <p className="text-3xl font-bold text-white">184</p>
        </Card>
      </div>

      <Card>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-base font-semibold text-white">Today's Check-ins</h3>
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search member..."
              className="bg-base-800 border border-base-600 rounded-full pl-9 pr-4 py-2 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-accent w-48"
            />
          </div>
        </div>
        <div className="space-y-2">
          {filteredCheckins.map((c) => (
            <div key={c.id} className="flex items-center justify-between p-4 rounded-2xl bg-base-800">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-accent to-accent-light flex items-center justify-center text-xs font-bold shrink-0">
                  {c.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{c.name}</p>
                  <p className="text-xs text-white/40">{c.membership_tier}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Badge variant="neutral">{c.method}</Badge>
                <div className="flex items-center gap-1.5 text-xs text-white/40">
                  <Clock size={12} />
                  {c.time}
                </div>
              </div>
            </div>
          ))}
          {filteredCheckins.length === 0 && (
            <p className="text-sm text-white/30 text-center py-8">No members match "{search}"</p>
          )}
        </div>
      </Card>
    </DashboardLayout>
  );
}