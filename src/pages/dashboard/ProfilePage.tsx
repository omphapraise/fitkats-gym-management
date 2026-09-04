import { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Mail, Phone, Calendar, Award, Edit2, Save } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/context/AuthContext';

export default function ProfilePage() {
  const { user, setUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    first_name: user?.first_name ?? '',
    last_name: user?.last_name ?? '',
    phone: user?.phone ?? '',
  });

  const handleSave = () => {
    if (user) {
      const updated = { ...user, ...form };
      setUser(updated);
      localStorage.setItem('fitkats_user', JSON.stringify(updated));
    }
    setEditing(false);
  };

  if (!user) return null;

  const tierLabel = user.membership_tier ? user.membership_tier.replace('_', ' ') : user.role;
  const memberSince = new Date(user.joined_at).toLocaleDateString('en-ZA', { month: 'long', year: 'numeric' });

  return (
    <DashboardLayout>
      <DashboardHeader
        title="Profile"
        subtitle="Manage your personal information"
        actions={
          editing ? (
            <Button variant="primary" size="sm" onClick={handleSave} icon={<Save size={14} />}>
              Save
            </Button>
          ) : (
            <Button variant="secondary" size="sm" onClick={() => setEditing(true)} icon={<Edit2 size={14} />}>
              Edit
            </Button>
          )
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-1 text-center">
          <div className="relative inline-block mb-5">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-accent to-accent-light flex items-center justify-center text-2xl font-bold mx-auto">
              {user.first_name[0]}
              {user.last_name[0]}
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-base-700 border-2 border-base-900 flex items-center justify-center hover:bg-base-600 transition-colors">
              <Camera size={13} className="text-white/70" />
            </button>
          </div>
          <h2 className="text-lg font-semibold text-white mb-1">
            {user.first_name} {user.last_name}
          </h2>
          <div className="flex justify-center mb-6">
            <Badge variant={user.membership_tier === 'premium' ? 'gold' : 'accent'}>
              {tierLabel}
            </Badge>
          </div>
          <div className="space-y-3 text-left">
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-base-800">
              <Calendar size={15} className="text-white/40 shrink-0" />
              <div>
                <p className="text-[10px] text-white/30">Member Since</p>
                <p className="text-sm text-white">{memberSince}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-base-800">
              <Award size={15} className="text-white/40 shrink-0" />
              <div>
                <p className="text-[10px] text-white/30">Reward Points</p>
                <p className="text-sm text-white">1,240 points</p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="lg:col-span-2">
          <h3 className="text-base font-semibold text-white mb-6">Personal Information</h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-xs font-medium text-white/50 mb-2 block">First Name</label>
              <input
                type="text"
                disabled={!editing}
                value={form.first_name}
                onChange={(e) => setForm((p) => ({ ...p, first_name: e.target.value }))}
                className="w-full bg-base-800 border border-base-600 rounded-2xl px-4 py-3 text-sm text-white disabled:opacity-50 focus:outline-none focus:border-accent transition-colors"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-white/50 mb-2 block">Last Name</label>
              <input
                type="text"
                disabled={!editing}
                value={form.last_name}
                onChange={(e) => setForm((p) => ({ ...p, last_name: e.target.value }))}
                className="w-full bg-base-800 border border-base-600 rounded-2xl px-4 py-3 text-sm text-white disabled:opacity-50 focus:outline-none focus:border-accent transition-colors"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="text-xs font-medium text-white/50 mb-2 block flex items-center gap-2">
              <Mail size={12} /> Email Address
            </label>
            <input
              type="email"
              disabled
              value={user.email}
              className="w-full bg-base-800 border border-base-600 rounded-2xl px-4 py-3 text-sm text-white/50 focus:outline-none"
            />
            <p className="text-[10px] text-white/30 mt-1.5">Contact support to change your email address.</p>
          </div>
          <div className="mb-6">
            <label className="text-xs font-medium text-white/50 mb-2 block flex items-center gap-2">
              <Phone size={12} /> Phone Number
            </label>
            <input
              type="tel"
              disabled={!editing}
              value={form.phone}
              onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
              className="w-full bg-base-800 border border-base-600 rounded-2xl px-4 py-3 text-sm text-white disabled:opacity-50 focus:outline-none focus:border-accent transition-colors"
            />
          </div>

          <div className="pt-6 border-t border-white/5">
            <h4 className="text-sm font-semibold text-white mb-4">Membership Details</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-base-800">
                <p className="text-xs text-white/40 mb-1">Current Tier</p>
                <p className="text-sm font-medium text-white capitalize">{tierLabel}</p>
              </div>
              <div className="p-4 rounded-2xl bg-base-800">
                <p className="text-xs text-white/40 mb-1">Status</p>
                <Badge variant="success">Active</Badge>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}