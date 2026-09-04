import { useState } from 'react';
import { Droplet, Shirt, Dumbbell, Sparkles, Check } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { MOCK_PERK_REDEMPTIONS, PerkRedemption } from '@/lib/mockData';

const CATEGORY_ICON = {
  Drink: Droplet,
  Merch: Shirt,
  'Trainer Session': Dumbbell,
  Massage: Sparkles,
};

export default function PerkFulfilmentPage() {
  const [redemptions, setRedemptions] = useState<PerkRedemption[]>(MOCK_PERK_REDEMPTIONS);

  const confirm = (id: number) => {
    setRedemptions((prev) => prev.map((r) => (r.id === id ? { ...r, status: 'confirmed' } : r)));
  };

  const pending = redemptions.filter((r) => r.status === 'pending');
  const confirmed = redemptions.filter((r) => r.status === 'confirmed');

  return (
    <DashboardLayout>
      <DashboardHeader title="Perk Fulfilment" subtitle="Confirm reward redemptions and session bookings" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card>
          <h3 className="text-base font-semibold text-white mb-6">Pending ({pending.length})</h3>
          <div className="space-y-3">
            {pending.map((r) => {
              const Icon = CATEGORY_ICON[r.category];
              return (
                <div key={r.id} className="flex items-center justify-between p-4 rounded-2xl bg-base-800">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-accent/10 flex items-center justify-center shrink-0">
                      <Icon size={16} className="text-accent-light" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{r.item}</p>
                      <p className="text-xs text-white/40">{r.member} · {r.category}</p>
                    </div>
                  </div>
                  <Button variant="primary" size="sm" icon={<Check size={13} />} onClick={() => confirm(r.id)}>
                    Confirm
                  </Button>
                </div>
              );
            })}
            {pending.length === 0 && <p className="text-sm text-white/30 text-center py-8">No pending redemptions.</p>}
          </div>
        </Card>

        <Card>
          <h3 className="text-base font-semibold text-white mb-6">Confirmed ({confirmed.length})</h3>
          <div className="space-y-3">
            {confirmed.map((r) => {
              const Icon = CATEGORY_ICON[r.category];
              return (
                <div key={r.id} className="flex items-center justify-between p-4 rounded-2xl bg-base-800">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-success/10 flex items-center justify-center shrink-0">
                      <Icon size={16} className="text-success" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{r.item}</p>
                      <p className="text-xs text-white/40">{r.member} · {r.category}</p>
                    </div>
                  </div>
                  <Badge variant="success">Confirmed</Badge>
                </div>
              );
            })}
            {confirmed.length === 0 && <p className="text-sm text-white/30 text-center py-8">Nothing confirmed yet.</p>}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}