import { useState } from 'react';
import { Bell, Lock, Palette, Globe, Trash2, Save } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface ToggleRowProps {
  label: string;
  description: string;
  checked: boolean;
  onChange: () => void;
}

function ToggleRow({ label, description, checked, onChange }: ToggleRowProps) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-white/5 last:border-0">
      <div>
        <p className="text-sm font-medium text-white mb-1">{label}</p>
        <p className="text-xs text-white/40">{description}</p>
      </div>
      <button
        onClick={onChange}
        className={`w-11 h-6 rounded-full transition-colors relative shrink-0 ${
          checked ? 'bg-accent' : 'bg-base-600'
        }`}
      >
        <span
          className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
            checked ? 'translate-x-5' : 'translate-x-0.5'
          }`}
        />
      </button>
    </div>
  );
}

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    classReminders: true,
    paymentAlerts: true,
    promotions: false,
    weeklyReport: true,
  });

  const [passwordForm, setPasswordForm] = useState({ current: '', new_password: '', confirm: '' });
  const [saved, setSaved] = useState(false);

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSavePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setPasswordForm({ current: '', new_password: '', confirm: '' });
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <DashboardLayout>
      <DashboardHeader title="Settings" subtitle="Manage your account preferences" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card>
          <div className="flex items-center gap-2 mb-2">
            <Bell size={17} className="text-accent-light" />
            <h3 className="text-base font-semibold text-white">Notifications</h3>
          </div>
          <div>
            <ToggleRow
              label="Class Reminders"
              description="Get notified 1 hour before booked classes"
              checked={notifications.classReminders}
              onChange={() => toggleNotification('classReminders')}
            />
            <ToggleRow
              label="Payment Alerts"
              description="Receive receipts and billing notifications"
              checked={notifications.paymentAlerts}
              onChange={() => toggleNotification('paymentAlerts')}
            />
            <ToggleRow
              label="Promotions & Offers"
              description="Occasional emails about deals and events"
              checked={notifications.promotions}
              onChange={() => toggleNotification('promotions')}
            />
            <ToggleRow
              label="Weekly Progress Report"
              description="A summary of your training every Sunday"
              checked={notifications.weeklyReport}
              onChange={() => toggleNotification('weeklyReport')}
            />
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-2 mb-6">
            <Lock size={17} className="text-accent-light" />
            <h3 className="text-base font-semibold text-white">Change Password</h3>
          </div>
          <form onSubmit={handleSavePassword} className="space-y-4">
            <div>
              <label className="text-xs font-medium text-white/50 mb-2 block">Current Password</label>
              <input
                type="password"
                value={passwordForm.current}
                onChange={(e) => setPasswordForm((p) => ({ ...p, current: e.target.value }))}
                className="w-full bg-base-800 border border-base-600 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-accent transition-colors"
                placeholder="••••••••"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-white/50 mb-2 block">New Password</label>
              <input
                type="password"
                value={passwordForm.new_password}
                onChange={(e) => setPasswordForm((p) => ({ ...p, new_password: e.target.value }))}
                className="w-full bg-base-800 border border-base-600 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-accent transition-colors"
                placeholder="At least 6 characters"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-white/50 mb-2 block">Confirm New Password</label>
              <input
                type="password"
                value={passwordForm.confirm}
                onChange={(e) => setPasswordForm((p) => ({ ...p, confirm: e.target.value }))}
                className="w-full bg-base-800 border border-base-600 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-accent transition-colors"
                placeholder="Re-enter new password"
              />
            </div>
            <Button type="submit" variant="primary" size="sm" icon={<Save size={13} />}>
              {saved ? 'Password Updated!' : 'Update Password'}
            </Button>
          </form>
        </Card>

        <Card>
          <div className="flex items-center gap-2 mb-6">
            <Palette size={17} className="text-accent-light" />
            <h3 className="text-base font-semibold text-white">Appearance</h3>
          </div>
          <div className="flex gap-3">
            <button className="flex-1 p-4 rounded-2xl bg-base-950 border-2 border-accent text-center">
              <div className="w-full h-10 rounded-lg bg-base-900 mb-3" />
              <span className="text-xs font-medium text-white">Dark</span>
            </button>
            <button className="flex-1 p-4 rounded-2xl bg-base-800 border-2 border-transparent text-center opacity-40 cursor-not-allowed">
              <div className="w-full h-10 rounded-lg bg-white mb-3" />
              <span className="text-xs font-medium text-white/50">Light (soon)</span>
            </button>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-2 mb-6">
            <Globe size={17} className="text-accent-light" />
            <h3 className="text-base font-semibold text-white">Language & Region</h3>
          </div>
          <div>
            <label className="text-xs font-medium text-white/50 mb-2 block">Language</label>
            <select className="w-full bg-base-800 border border-base-600 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-accent transition-colors">
              <option>English (South Africa)</option>
              <option>Afrikaans</option>
              <option>isiZulu</option>
            </select>
          </div>
        </Card>

        <Card className="lg:col-span-2 border-danger/20">
          <div className="flex items-center gap-2 mb-4">
            <Trash2 size={17} className="text-danger" />
            <h3 className="text-base font-semibold text-white">Danger Zone</h3>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white mb-1">Delete Account</p>
              <p className="text-xs text-white/40">Permanently remove your account and all associated data.</p>
            </div>
            <Button variant="secondary" size="sm" className="border-danger/30 text-danger hover:bg-danger/10">
              Delete Account
            </Button>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}