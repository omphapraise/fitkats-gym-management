import { useState } from 'react';
import { Search, UserPlus, ShieldCheck, ShieldOff, FileCheck } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { MOCK_MEMBERS, MemberRecord } from '@/lib/mockData';
import { useAuth } from '@/context/AuthContext';

export default function MembersPage() {
  const { user } = useAuth();
  const isManager = user?.role === 'manager';
  const [members, setMembers] = useState<MemberRecord[]>(MOCK_MEMBERS);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<MemberRecord | null>(null);

  const filtered = members.filter(
    (m) => m.name.toLowerCase().includes(search.toLowerCase()) || m.email.toLowerCase().includes(search.toLowerCase())
  );

  const toggleSuspend = (id: number) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status: m.status === 'suspended' ? 'active' : 'suspended' } : m))
    );
  };

  const verifyDocs = (id: number) => {
    setMembers((prev) => prev.map((m) => (m.id === id ? { ...m, status: 'active' } : m)));
  };

  const statusVariant = { active: 'success', suspended: 'danger', pending_verification: 'warning' } as const;
  const statusLabel = { active: 'Active', suspended: 'Suspended', pending_verification: 'Pending Verification' } as const;

  return (
    <DashboardLayout>
      <DashboardHeader
        title="Member Management"
        subtitle="Search, register, and manage member accounts"
        actions={
          <Button variant="primary" size="sm" icon={<UserPlus size={14} />}>
            Register Walk-In Member
          </Button>
        }
      />

      <div className="relative mb-6">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or email..."
          className="w-full bg-base-800 border border-base-600 rounded-2xl pl-11 pr-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-accent transition-colors"
        />
      </div>

      <Card className="mb-6">
        <div className="space-y-2">
          {filtered.map((m) => (
            <div
              key={m.id}
              onClick={() => setSelected(m)}
              className="flex items-center justify-between p-4 rounded-2xl bg-base-800 cursor-pointer hover:bg-base-700 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-accent-light flex items-center justify-center text-xs font-bold shrink-0">
                  {m.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{m.name}</p>
                  <p className="text-xs text-white/40">{m.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Badge variant="neutral">{m.tier}</Badge>
                <Badge variant={statusVariant[m.status]}>{statusLabel[m.status]}</Badge>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <p className="text-sm text-white/30 text-center py-8">No members match "{search}"</p>
          )}
        </div>
      </Card>

      {selected && (
        <Card>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-accent to-accent-light flex items-center justify-center text-lg font-bold">
                {selected.name.split(' ').map((n) => n[0]).join('')}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">{selected.name}</h3>
                <p className="text-sm text-white/40">{selected.email}</p>
              </div>
            </div>
            <Badge variant={statusVariant[selected.status]}>{statusLabel[selected.status]}</Badge>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="p-4 rounded-2xl bg-base-800">
              <p className="text-xs text-white/40 mb-1">Membership Tier</p>
              <p className="text-sm font-medium text-white">{selected.tier}</p>
            </div>
            <div className="p-4 rounded-2xl bg-base-800">
              <p className="text-xs text-white/40 mb-1">Joined</p>
              <p className="text-sm font-medium text-white">
                {new Date(selected.joined).toLocaleDateString('en-ZA', { day: 'numeric', month: 'short', year: 'numeric' })}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-base-800">
              <p className="text-xs text-white/40 mb-1">Member ID</p>
              <p className="text-sm font-medium text-white">#{selected.id.toString().padStart(5, '0')}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {selected.status === 'pending_verification' && (
              <Button variant="primary" size="sm" icon={<FileCheck size={14} />} onClick={() => verifyDocs(selected.id)}>
                Verify Tier Documents
              </Button>
            )}
            {isManager && (
              <Button
                variant="secondary"
                size="sm"
                icon={selected.status === 'suspended' ? <ShieldCheck size={14} /> : <ShieldOff size={14} />}
                onClick={() => toggleSuspend(selected.id)}
                className={selected.status !== 'suspended' ? 'border-danger/30 text-danger hover:bg-danger/10' : ''}
              >
                {selected.status === 'suspended' ? 'Reactivate Account' : 'Suspend Account'}
              </Button>
            )}
          </div>
        </Card>
      )}
    </DashboardLayout>
  );
}