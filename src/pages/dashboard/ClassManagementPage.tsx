import { useState } from 'react';
import { Plus, Users, Clock, MapPin, Edit2 } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { MOCK_CLASSES } from '@/lib/mockData';

export default function ClassManagementPage() {
  const [classes] = useState(MOCK_CLASSES);
  const [editingId, setEditingId] = useState<number | null>(null);

  return (
    <DashboardLayout>
      <DashboardHeader
        title="Class Management"
        subtitle="View schedule, edit classes, and track today's attendance"
        actions={
          <Button variant="primary" size="sm" icon={<Plus size={14} />}>
            Add Class
          </Button>
        }
      />

      <div className="space-y-3">
        {classes.map((c) => {
          const fillPercent = Math.round((c.booked_count / c.capacity) * 100);
          const isEditing = editingId === c.id;

          return (
            <Card key={c.id}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-accent/10 flex items-center justify-center shrink-0">
                    <Users size={17} className="text-accent-light" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white mb-1">{c.name}</p>
                    <div className="flex items-center gap-4 text-xs text-white/40">
                      <span className="flex items-center gap-1.5">
                        <Clock size={12} />
                        {new Date(c.start_time).toLocaleDateString('en-ZA', { weekday: 'short', hour: '2-digit', minute: '2-digit' })}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin size={12} /> {c.location}
                      </span>
                      <span>{c.instructor}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm font-semibold text-white">{c.booked_count}/{c.capacity}</p>
                    <p className="text-[10px] text-white/30">{fillPercent}% full</p>
                  </div>
                  <Badge variant={c.intensity === 'high' ? 'danger' : c.intensity === 'medium' ? 'warning' : 'success'}>
                    {c.intensity}
                  </Badge>
                  <Button variant="ghost" size="sm" icon={<Edit2 size={13} />} onClick={() => setEditingId(isEditing ? null : c.id)}>
                    Edit
                  </Button>
                </div>
              </div>

              {isEditing && (
                <div className="mt-5 pt-5 border-t border-white/5 grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-white/50 mb-2 block">Instructor</label>
                    <input
                      defaultValue={c.instructor}
                      className="w-full bg-base-800 border border-base-600 rounded-2xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-accent"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-white/50 mb-2 block">Capacity</label>
                    <input
                      type="number"
                      defaultValue={c.capacity}
                      className="w-full bg-base-800 border border-base-600 rounded-2xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-accent"
                    />
                  </div>
                  <div className="col-span-2 flex gap-3">
                    <Button variant="primary" size="sm" onClick={() => setEditingId(null)}>Save Changes</Button>
                    <Button variant="secondary" size="sm" onClick={() => setEditingId(null)}>Cancel</Button>
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </DashboardLayout>
  );
}