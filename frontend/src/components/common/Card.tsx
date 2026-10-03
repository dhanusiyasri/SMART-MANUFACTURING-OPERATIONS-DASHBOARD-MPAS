import React, { ReactNode } from 'react';

interface CardProps {
  title?: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  headerClassName?: string;
}

export const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  action,
  children,
  className = '',
  headerClassName = ''
}) => {
  return (
    <div className={`bg-slate-50 border border-slate-200 rounded-xl shadow-xs overflow-hidden transition-all ${className}`}>
      {(title || action) && (
        <div className={`px-5 py-4 border-b border-slate-200 bg-white flex items-center justify-between ${headerClassName}`}>
          <div>
            {title && <h3 className="text-base font-semibold text-slate-900 tracking-tight">{title}</h3>}
            {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      <div className="p-5">{children}</div>
    </div>
  );
};
