import React, { ReactNode } from 'react';

export type BadgeVariant = 'blue' | 'amber' | 'red' | 'green' | 'gray';

interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'blue',
  children,
  className = ''
}) => {
  const variantStyles: Record<BadgeVariant, string> = {
    blue: 'bg-brand-50 text-brand-700 border-brand-200',
    amber: 'bg-amber-50 text-amber-700 border-amber-200',
    red: 'bg-red-50 text-red-700 border-red-200',
    green: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    gray: 'bg-slate-100 text-slate-700 border-slate-200'
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
