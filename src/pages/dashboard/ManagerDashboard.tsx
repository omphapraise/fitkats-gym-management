import { useEffect, useState } from 'react';
import { TrendingUp, Users, DollarSign, CheckCircle2, Gauge, Wrench } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { Card } from '@/components/ui/Card';
import { getGymCapacity, MOCK_MAINTENANCE } from '@/lib/mockData';

const MEMBERSHIP_SPLIT = [
  { name: 'Student', value: 640, color: '#3d3d42' },
  { name: 'Job Seeker', value: 410, color: '#5a5a60' },
  { name: 'Middle Class', value: 880, color: '#0a84ff' },
  { name: 'Premium', value: 482, color: '#c9a24b' },
];

export default function ManagerDashboard() {
  const [capacity, setCapacity] = useState(0);

  useEffect(() => {
    setCapacity(getGymCapacity());
  }, []);

  const totalMembers = MEMBERSHIP_SPLIT.reduce((sum, m) => sum + m.value, 0);
  const openMaintenance = MOCK_MAINTENANCE.filter((m) => m.status !== 'resolved').length;

  return (
    <DashboardLayout>
      <DashboardHeader title="Manager Dashboard" subtitle="Key performance indicators — Sandton branch" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
        <Card>
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs text-white/40">Monthly Revenue</p>
            <DollarSign size={16} className="text-success" />
          </div>
          <p className="text-3xl font-bold text-white">R502k</p>
          <p className="text-xs text-success mt-2 flex items-center gap-1">
            <TrendingUp size={12} /> +4.8% vs last month
          </p>
        </Card>
        <Card>
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs text-white/40">Active Members</p>
            <Users size={16} className="text-accent-light" />
          </div>
          <p className="text-3xl font-bold text-white">{totalMembers.toLocaleString()}</p>
        </Card>
        <Card>
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs text-white/40">Check-ins Today</p>
            <CheckCircle2 size={16} className="text-success" />
          </div>
          <p className="text-3xl font-bold text-white">184</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
        <Card>
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs text-white/40">Live Gym Capacity</p>
            <Gauge size={16} className="text-warning" />
          </div>
          <p className="text-3xl font-bold text-white">{capacity}%</p>
        </Card>
        <Card>
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs text-white/40">Open Maintenance Requests</p>
            <Wrench size={16} className="text-danger" />
          </div>
          <p className="text-3xl font-bold text-white">{openMaintenance}</p>
        </Card>
        <Card>
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs text-white/40">Retention Rate</p>
            <TrendingUp size={16} className="text-gold-light" />
          </div>
          <p className="text-3xl font-bold text-white">91.2%</p>
        </Card>
      </div>

      <Card>
        <h3 className="text-base font-semibold text-white mb-6">Active Members by Tier</h3>
        <div className="flex flex-col sm:flex-row items-center gap-8">
          <ResponsiveContainer width={220} height={220}>
            <PieChart>
              <Pie data={MEMBERSHIP_SPLIT} dataKey="value" nameKey="name" innerRadius={55} outerRadius={80} paddingAngle={3}>
                {MEMBERSHIP_SPLIT.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} stroke="none" />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: '#18181b', border: '1px solid #2c2c30', borderRadius: 16, fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-3 flex-1 w-full">
            {MEMBERSHIP_SPLIT.map((tier) => (
              <div key={tier.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: tier.color }} />
                  <span className="text-white/60">{tier.name}</span>
                </div>
                <span className="text-white font-medium">{tier.value}</span>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </DashboardLayout>
  );
}