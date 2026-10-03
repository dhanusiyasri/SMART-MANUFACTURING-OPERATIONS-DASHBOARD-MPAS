import React, { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  badge?: ReactNode;
  actions?: ReactNode;
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  badge,
  actions,
  className = ''
}) => {
  return (
    <div className={`flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 mb-4 border-b border-slate-200/80 ${className}`}>
      <div>
        <div className="flex items-center space-x-3">
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">{title}</h1>
          {badge && <div>{badge}</div>}
        </div>
        {subtitle && <p className="text-xs text-slate-500 mt-1">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center space-x-2.5">{actions}</div>}
    </div>
  );
};
