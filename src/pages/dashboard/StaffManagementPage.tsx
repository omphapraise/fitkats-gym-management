import { useState } from 'react';
import { Clock, ShieldCheck, ShieldOff } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { MOCK_STAFF, StaffAccount } from '@/lib/mockData';

export default function StaffManagementPage() {
  const [staff, setStaff] = useState<StaffAccount[]>(MOCK_STAFF);

  const toggleStatus = (id: number) => {
    setStaff((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: s.status === 'active' ? 'inactive' : 'active' } : s))
    );
  };

  return (
    <DashboardLayout>
      <DashboardHeader title="Staff Management" subtitle="Staff accounts, activity, and access" />

      <Card>
        <div className="space-y-2">
          {staff.map((s) => (
            <div key={s.id} className="flex items-center justify-between p-4 rounded-2xl bg-base-800">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-accent-light flex items-center justify-center text-xs font-bold shrink-0">
                  {s.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{s.name}</p>
                  <p className="text-xs text-white/40">{s.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-5">
                <Badge variant="neutral" icon={<Clock size={11} />}>
                  {new Date(s.lastActive).toLocaleDateString('en-ZA', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                </Badge>
                <Badge variant="accent">{s.role}</Badge>
                <Badge variant={s.status === 'active' ? 'success' : 'neutral'}>{s.status}</Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  icon={s.status === 'active' ? <ShieldOff size={13} /> : <ShieldCheck size={13} />}
                  onClick={() => toggleStatus(s.id)}
                >
                  {s.status === 'active' ? 'Deactivate' : 'Reactivate'}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </DashboardLayout>
  );
}