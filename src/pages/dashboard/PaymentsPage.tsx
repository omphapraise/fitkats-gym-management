import { useState } from 'react';
import { CreditCard, Download, CheckCircle2, Clock3, XCircle, Plus, Receipt } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { MOCK_PAYMENTS, TIER_PRICING } from '@/lib/mockData';
import { useAuth } from '@/context/AuthContext';

const DEMO_EMAILS = ['member@fitkats.co.za', 'staff@fitkats.co.za', 'manager@fitkats.co.za'];

export default function PaymentsPage() {
  const { user } = useAuth();
  const isDemoAccount = user ? DEMO_EMAILS.includes(user.email.toLowerCase()) : false;

  // ============ NEW / REAL USER VIEW — no fake transaction history ============
  if (!isDemoAccount) {
    const tierInfo = user?.membership_tier ? TIER_PRICING[user.membership_tier] : null;

    return (
      <DashboardLayout>
        <DashboardHeader
          title="Payments"
          subtitle="Billing history and membership charges"
          actions={
            <Button variant="primary" size="sm" icon={<Plus size={14} />}>
              Add Payment Method
            </Button>
          }
        />

        <Card className="mb-8">
          <h3 className="text-base font-semibold text-white mb-6">Your Membership</h3>
          <div className="flex items-center justify-between p-4 rounded-2xl bg-base-800">
            <div>
              <p className="text-sm font-medium text-white mb-1">{tierInfo?.name ?? 'Membership'} Plan</p>
              <p className="text-xs text-white/40">Billed monthly · next payment due at your first billing cycle</p>
            </div>
            <p className="text-xl font-bold text-white">R{tierInfo?.price ?? 0}<span className="text-sm text-white/40">/mo</span></p>
          </div>
        </Card>

        <Card className="mb-8">
          <h3 className="text-base font-semibold text-white mb-6">Payment Method</h3>
          <div className="text-center py-8">
            <CreditCard size={28} className="text-white/20 mx-auto mb-4" />
            <p className="text-sm text-white/40 mb-5">No payment method on file yet.</p>
            <Button variant="secondary" size="sm" icon={<Plus size={13} />}>
              Add a Card
            </Button>
          </div>
        </Card>

        <Card>
          <h3 className="text-base font-semibold text-white mb-6">Transaction History</h3>
          <div className="text-center py-12">
            <Receipt size={28} className="text-white/20 mx-auto mb-4" />
            <p className="text-sm text-white/40">No transactions yet. Your billing history will appear here.</p>
          </div>
        </Card>
      </DashboardLayout>
    );
  }

  // ============ DEMO ACCOUNT VIEW (rich sample data) ============
  const [payments] = useState(MOCK_PAYMENTS);

  const totalPaid = payments.filter((p) => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0);
  const pendingCount = payments.filter((p) => p.status === 'pending').length;

  const statusConfig = {
    paid: { variant: 'success' as const, icon: <CheckCircle2 size={12} /> },
    pending: { variant: 'warning' as const, icon: <Clock3 size={12} /> },
    failed: { variant: 'danger' as const, icon: <XCircle size={12} /> },
  };

  return (
    <DashboardLayout>
      <DashboardHeader
        title="Payments"
        subtitle="Billing history and membership charges"
        actions={
          <Button variant="primary" size="sm" icon={<Plus size={14} />}>
            Add Payment Method
          </Button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
        <Card>
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs text-white/40">Total Paid (YTD)</p>
            <CheckCircle2 size={16} className="text-success" />
          </div>
          <p className="text-3xl font-bold text-white">R{totalPaid.toLocaleString()}</p>
        </Card>
        <Card>
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs text-white/40">Pending Payments</p>
            <Clock3 size={16} className="text-warning" />
          </div>
          <p className="text-3xl font-bold text-white">{pendingCount}</p>
        </Card>
        <Card>
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs text-white/40">Next Billing Date</p>
            <CreditCard size={16} className="text-accent-light" />
          </div>
          <p className="text-3xl font-bold text-white">Aug 30</p>
        </Card>
      </div>

      <Card className="mb-8">
        <h3 className="text-base font-semibold text-white mb-6">Payment Method</h3>
        <div className="flex items-center justify-between p-4 rounded-2xl bg-base-800">
          <div className="flex items-center gap-4">
            <div className="w-12 h-8 rounded-lg bg-gradient-to-br from-accent to-accent-light flex items-center justify-center">
              <CreditCard size={15} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">Visa ending in 4821</p>
              <p className="text-xs text-white/40">Expires 09/28</p>
            </div>
          </div>
          <Badge variant="success">Default</Badge>
        </div>
      </Card>

      <Card>
        <h3 className="text-base font-semibold text-white mb-6">Transaction History</h3>
        <div className="space-y-2">
          {payments.map((p) => (
            <div key={p.id} className="flex items-center justify-between p-4 rounded-2xl bg-base-800">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-2xl bg-white/5 flex items-center justify-center shrink-0">
                  <CreditCard size={17} className="text-white/50" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{p.description}</p>
                  <p className="text-xs text-white/40">
                    {p.invoice_number} · {new Date(p.created_at).toLocaleDateString('en-ZA', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-5">
                <span className="text-sm font-semibold text-white">R{p.amount.toFixed(2)}</span>
                <Badge variant={statusConfig[p.status].variant} icon={statusConfig[p.status].icon}>
                  {p.status}
                </Badge>
                <button className="w-9 h-9 rounded-full bg-base-700 flex items-center justify-center hover:bg-base-600 transition-colors">
                  <Download size={14} className="text-white/50" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </DashboardLayout>
  );
}