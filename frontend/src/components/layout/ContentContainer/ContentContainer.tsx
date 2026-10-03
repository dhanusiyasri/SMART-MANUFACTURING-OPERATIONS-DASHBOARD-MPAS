import React, { ReactNode } from 'react';

interface ContentContainerProps {
  children: ReactNode;
  className?: string;
}

export const ContentContainer: React.FC<ContentContainerProps> = ({
  children,
  className = ''
}) => {
  return (
    <div className={`w-full max-w-7xl mx-auto space-y-6 ${className}`}>
      {children}
    </div>
  );
};
