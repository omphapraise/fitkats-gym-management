import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Droplet, UserCheck, Shirt, Users, HeartPulse, Crown, Lock, Check } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { MOCK_REWARDS } from '@/lib/mockData';

const ICON_MAP: Record<string, typeof Droplet> = {
  droplet: Droplet,
  'user-check': UserCheck,
  shirt: Shirt,
  users: Users,
  'heart-pulse': HeartPulse,
  crown: Crown,
};

const CURRENT_POINTS = 1240;

export default function RewardsPage() {
  const [redeemedIds, setRedeemedIds] = useState<number[]>([]);
  const [points, setPoints] = useState(CURRENT_POINTS);

  const handleRedeem = (id: number, cost: number) => {
    if (points < cost || redeemedIds.includes(id)) return;
    setPoints((p) => p - cost);
    setRedeemedIds((prev) => [...prev, id]);
  };

  const progressToNextTier = Math.min((points / 1000) * 100, 100);

  return (
    <DashboardLayout>
      <DashboardHeader title="Rewards" subtitle="Earn points, redeem perks" />

      <Card className="mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-[100px]" />
        <div className="relative flex items-center justify-between">
          <div>
            <p className="text-sm text-white/40 mb-2">Your Balance</p>
            <p className="text-4xl font-bold text-gradient-accent mb-4">{points.toLocaleString()} pts</p>
            <div className="w-64">
              <div className="flex justify-between text-xs text-white/40 mb-1.5">
                <span>Progress to Premium Discount</span>
                <span>{points}/1000</span>
              </div>
              <div className="h-2 bg-base-700 rounded-full overflow-hidden w-64">
                <div
                  className="h-full bg-gradient-to-r from-accent to-gold rounded-full transition-all"
                  style={{ width: `${progressToNextTier}%` }}
                />
              </div>
            </div>
          </div>
          <div className="w-20 h-20 rounded-3xl bg-gold/10 flex items-center justify-center">
            <Trophy size={32} className="text-gold-light" />
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {MOCK_REWARDS.map((reward, i) => {
          const Icon = ICON_MAP[reward.icon] ?? Trophy;
          const isRedeemed = redeemedIds.includes(reward.id);
          const canAfford = points >= reward.points_required;

          return (
            <motion.div
              key={reward.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <Card className={`h-full flex flex-col ${!canAfford && !isRedeemed ? 'opacity-60' : ''}`} hover>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-2xl bg-gold/10 flex items-center justify-center">
                    <Icon size={19} className="text-gold-light" />
                  </div>
                  {!canAfford && !isRedeemed && <Lock size={14} className="text-white/30" />}
                </div>
                <Badge variant="neutral">{reward.category}</Badge>
                <h3 className="text-base font-semibold text-white mt-3 mb-2">{reward.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed mb-5 flex-1">{reward.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-gold-light">{reward.points_required} pts</span>
                  <Button
                    variant={isRedeemed ? 'secondary' : 'gold'}
                    size="sm"
                    disabled={!canAfford || isRedeemed}
                    onClick={() => handleRedeem(reward.id, reward.points_required)}
                    icon={isRedeemed ? <Check size={13} /> : undefined}
                  >
                    {isRedeemed ? 'Redeemed' : 'Redeem'}
                  </Button>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </DashboardLayout>
  );
}