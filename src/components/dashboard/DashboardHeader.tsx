import { ReactNode } from 'react';
import { Bell } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}

export function DashboardHeader({ title, subtitle, actions }: DashboardHeaderProps) {
  const { user } = useAuth();

  return (
    <div className="flex items-start justify-between mb-10">
      <div>
        <p className="text-sm text-white/40 mb-1">
          Welcome back, {user?.first_name}
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-white">{title}</h1>
        {subtitle && <p className="text-white/50 mt-2 text-sm">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-3">
        {actions}
        <button className="relative w-11 h-11 rounded-full bg-base-900 border border-white/5 flex items-center justify-center hover:bg-base-800 transition-colors">
          <Bell size={17} className="text-white/60" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-accent rounded-full" />
        </button>
      </div>
    </div>
  );
}