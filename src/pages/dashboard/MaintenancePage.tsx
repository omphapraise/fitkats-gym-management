import { useState } from 'react';
import { Wrench, MapPin, User, ArrowRight } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { MOCK_MAINTENANCE, MaintenanceRequest } from '@/lib/mockData';

type TabKey = 'open' | 'in_progress' | 'resolved';

export default function MaintenancePage() {
  const [requests, setRequests] = useState<MaintenanceRequest[]>(MOCK_MAINTENANCE);
  const [tab, setTab] = useState<TabKey>('open');

  const advance = (id: number) => {
    setRequests((prev) =>
      prev.map((r) => {
        if (r.id !== id) return r;
        if (r.status === 'open') return { ...r, status: 'in_progress' };
        if (r.status === 'in_progress') return { ...r, status: 'resolved' };
        return r;
      })
    );
  };

  const filtered = requests.filter((r) => r.status === tab);
  const TABS: { key: TabKey; label: string }[] = [
    { key: 'open', label: 'Open' },
    { key: 'in_progress', label: 'In Progress' },
    { key: 'resolved', label: 'Resolved' },
  ];

  const priorityVariant = { low: 'neutral', medium: 'warning', high: 'danger' } as const;

  return (
    <DashboardLayout>
      <DashboardHeader title="Maintenance" subtitle="Facility fault reports and repair status" />

      <div className="flex gap-2 mb-8">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${
              tab === t.key ? 'bg-white text-base-950' : 'bg-base-800 text-white/50 hover:text-white'
            }`}
          >
            {t.label} ({requests.filter((r) => r.status === t.key).length})
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((r) => (
          <Card key={r.id} className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-2xl bg-warning/10 flex items-center justify-center shrink-0">
                <Wrench size={17} className="text-warning" />
              </div>
              <div>
                <p className="text-sm font-medium text-white mb-1">{r.title}</p>
                <div className="flex items-center gap-4 text-xs text-white/40">
                  <span className="flex items-center gap-1.5"><MapPin size={12} /> {r.location}</span>
                  <span className="flex items-center gap-1.5"><User size={12} /> {r.reportedBy}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant={priorityVariant[r.priority]}>{r.priority}</Badge>
              {r.status !== 'resolved' && (
                <Button variant="secondary" size="sm" icon={<ArrowRight size={13} />} onClick={() => advance(r.id)}>
                  {r.status === 'open' ? 'Start Work' : 'Mark Resolved'}
                </Button>
              )}
            </div>
          </Card>
        ))}
        {filtered.length === 0 && <p className="text-sm text-white/30 text-center py-16">No {tab.replace('_', ' ')} requests.</p>}
      </div>
    </DashboardLayout>
  );
}