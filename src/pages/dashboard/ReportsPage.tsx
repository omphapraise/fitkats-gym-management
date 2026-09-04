import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Download } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { MOCK_REVENUE_REPORT } from '@/lib/mockData';

type ReportType = 'revenue' | 'membership' | 'cancellations' | 'attendance' | 'maintenance';

const REPORT_TABS: { key: ReportType; label: string }[] = [
  { key: 'revenue', label: 'Revenue' },
  { key: 'membership', label: 'Membership' },
  { key: 'cancellations', label: 'Cancellations' },
  { key: 'attendance', label: 'Class Attendance' },
  { key: 'maintenance', label: 'Maintenance' },
];

export default function ReportsPage() {
  const [report, setReport] = useState<ReportType>('revenue');

  return (
    <DashboardLayout>
      <DashboardHeader
        title="Reports"
        subtitle="Facility performance across all tracked metrics"
        actions={
          <Button variant="secondary" size="sm" icon={<Download size={14} />}>
            Export Report
          </Button>
        }
      />

      <div className="flex gap-2 mb-8 overflow-x-auto pb-1">
        {REPORT_TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setReport(t.key)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              report === t.key ? 'bg-white text-base-950' : 'bg-base-800 text-white/50 hover:text-white'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {report === 'revenue' && (
        <Card>
          <h3 className="text-base font-semibold text-white mb-6">Monthly Revenue</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={MOCK_REVENUE_REPORT}>
              <CartesianGrid strokeDasharray="3 3" stroke="#212124" />
              <XAxis dataKey="month" stroke="#5a5a60" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#5a5a60" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `R${v / 1000}k`} />
              <Tooltip
                contentStyle={{ background: '#18181b', border: '1px solid #2c2c30', borderRadius: 16, fontSize: 12 }}
                formatter={(value: number) => [`R${value.toLocaleString()}`, 'Revenue']}
              />
              <Bar dataKey="revenue" fill="#0a84ff" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      )}

      {report === 'membership' && (
        <Card>
          <h3 className="text-base font-semibold text-white mb-6">New Members per Month</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={MOCK_REVENUE_REPORT}>
              <CartesianGrid strokeDasharray="3 3" stroke="#212124" />
              <XAxis dataKey="month" stroke="#5a5a60" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#5a5a60" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ background: '#18181b', border: '1px solid #2c2c30', borderRadius: 16, fontSize: 12 }} />
              <Bar dataKey="newMembers" fill="#30d158" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      )}

      {report === 'cancellations' && (
        <Card>
          <h3 className="text-base font-semibold text-white mb-6">Cancellations per Month</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={MOCK_REVENUE_REPORT}>
              <CartesianGrid strokeDasharray="3 3" stroke="#212124" />
              <XAxis dataKey="month" stroke="#5a5a60" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#5a5a60" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ background: '#18181b', border: '1px solid #2c2c30', borderRadius: 16, fontSize: 12 }} />
              <Bar dataKey="cancellations" fill="#ff453a" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      )}

      {report === 'attendance' && (
        <Card className="text-center py-16">
          <p className="text-white/40 text-sm">Class attendance report data coming soon.</p>
        </Card>
      )}

      {report === 'maintenance' && (
        <Card className="text-center py-16">
          <p className="text-white/40 text-sm">Maintenance report data coming soon.</p>
        </Card>
      )}
    </DashboardLayout>
  );
}