import React, { ReactNode } from 'react';

interface SapKpiContainerProps {
  children: ReactNode;
  className?: string;
}

export const SapKpiContainer: React.FC<SapKpiContainerProps> = ({ children, className = '' }) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ${className}`}>
      {children}
    </div>
  );
};
