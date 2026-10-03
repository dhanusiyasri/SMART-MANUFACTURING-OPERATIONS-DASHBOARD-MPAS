import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  fullPage?: boolean;
  label?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  fullPage = false,
  label = 'Loading Dashboard Data...'
}) => {
  const sizeClasses = {
    sm: 'w-5 h-5 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4'
  };

  const spinner = (
    <div className="flex flex-col items-center justify-center p-6 space-y-3">
      <div
        className={`${sizeClasses[size]} border-brand-600 border-t-transparent rounded-full animate-spin`}
      />
      {label && <p className="text-sm text-slate-500 font-medium">{label}</p>}
    </div>
  );

  if (fullPage) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
        {spinner}
      </div>
    );
  }

  return spinner;
};
