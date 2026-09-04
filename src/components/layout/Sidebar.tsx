import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, User, Calendar, CalendarCheck, CreditCard, Activity,
  Trophy, Settings, LogOut, Dumbbell, Users, Megaphone, BarChart3,
  Wrench, Gift, UserCog,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { UserRole } from '@/types';

interface NavItem {
  label: string;
  path: string;
  icon: typeof LayoutDashboard;
}

const NAV_BY_ROLE: Record<UserRole, NavItem[]> = {
  visitor: [],
  member: [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Classes', path: '/dashboard/classes', icon: Calendar },
    { label: 'Bookings', path: '/dashboard/bookings', icon: CalendarCheck },
    { label: 'Workout Progress', path: '/dashboard/workout-progress', icon: Activity },
    { label: 'Payments', path: '/dashboard/payments', icon: CreditCard },
    { label: 'Rewards', path: '/dashboard/rewards', icon: Trophy },
    { label: 'Profile', path: '/dashboard/profile', icon: User },
    { label: 'Settings', path: '/dashboard/settings', icon: Settings },
  ],
  staff: [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Members', path: '/dashboard/members', icon: Users },
    { label: 'Classes', path: '/dashboard/manage-classes', icon: Calendar },
    { label: 'Perks', path: '/dashboard/perks', icon: Gift },
    { label: 'Maintenance', path: '/dashboard/maintenance', icon: Wrench },
    { label: 'Announcements', path: '/dashboard/announcements', icon: Megaphone },
    { label: 'Profile', path: '/dashboard/profile', icon: User },
    { label: 'Settings', path: '/dashboard/settings', icon: Settings },
  ],
  manager: [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Members', path: '/dashboard/members', icon: Users },
    { label: 'Reports', path: '/dashboard/reports', icon: BarChart3 },
    { label: 'Classes', path: '/dashboard/manage-classes', icon: Calendar },
    { label: 'Staff', path: '/dashboard/staff', icon: UserCog },
    { label: 'Maintenance', path: '/dashboard/maintenance', icon: Wrench },
    { label: 'Announcements', path: '/dashboard/announcements', icon: Megaphone },
    { label: 'Profile', path: '/dashboard/profile', icon: User },
    { label: 'Settings', path: '/dashboard/settings', icon: Settings },
  ],
};

export function Sidebar() {
  const { user, logout } = useAuth();
  const location = useLocation();

  if (!user) return null;

  const navItems = NAV_BY_ROLE[user.role];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-base-900 border-r border-white/5 flex flex-col z-40">
      <div className="h-20 flex items-center px-6 border-b border-white/5">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent to-accent-light flex items-center justify-center">
            <Dumbbell size={18} className="text-white" strokeWidth={2.5} />
          </div>
          <span className="text-lg font-bold tracking-tight">Fit Kats</span>
        </Link>
      </div>

      <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link key={item.path} to={item.path} className="block relative">
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 bg-white/10 rounded-2xl"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <div
                className={`relative flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-colors ${
                  isActive ? 'text-white' : 'text-white/50 hover:text-white'
                }`}
              >
                <item.icon size={18} />
                {item.label}
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/5">
        <div className="flex items-center gap-3 px-3 py-3 mb-2">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-accent to-accent-light flex items-center justify-center text-xs font-bold shrink-0">
            {user.first_name[0]}
            {user.last_name[0]}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-white truncate">
              {user.first_name} {user.last_name}
            </p>
            <p className="text-xs text-white/40 capitalize truncate">
              {user.membership_tier ? user.membership_tier.replace('_', ' ') : user.role}
            </p>
          </div>
        </div>
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium text-white/50 hover:text-danger hover:bg-danger/10 transition-colors"
        >
          <LogOut size={17} />
          Log Out
        </button>
      </div>
    </aside>
  );
}