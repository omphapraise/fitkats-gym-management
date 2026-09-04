import { ReactNode } from 'react';

type BadgeVariant = 'accent' | 'gold' | 'success' | 'warning' | 'danger' | 'neutral';

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  icon?: ReactNode;
}

const variantClasses: Record<BadgeVariant, string> = {
  accent: 'bg-accent/10 text-accent-light border-accent/20',
  gold: 'bg-gold/10 text-gold-light border-gold/20',
  success: 'bg-success/10 text-success border-success/20',
  warning: 'bg-warning/10 text-warning border-warning/20',
  danger: 'bg-danger/10 text-danger border-danger/20',
  neutral: 'bg-white/5 text-white/70 border-white/10',
};

export function Badge({ children, variant = 'neutral', icon }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${variantClasses[variant]}`}
    >
      {icon}
      {children}
    </span>
  );
}