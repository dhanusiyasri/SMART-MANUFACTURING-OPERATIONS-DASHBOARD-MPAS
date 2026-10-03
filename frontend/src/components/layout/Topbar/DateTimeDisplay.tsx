import React, { useState, useEffect } from 'react';

export const DateTimeDisplay: React.FC = () => {
  const [now, setNow] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format Date: 25 Jul 2026
  const formattedDate = now.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });

  // Format Time: 12:30:45 PM
  const formattedTime = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });

  // Determine Manufacturing Shift (A: 06:00-14:30, B: 14:30-23:00, C: 23:00-06:00)
  const hour = now.getHours();
  const shift = hour >= 6 && hour < 14 ? 'Shift A' : hour >= 14 && hour < 22 ? 'Shift B' : 'Shift C';

  return (
    <div className="hidden xl:flex flex-col items-end border-r border-slate-200 pr-4 mr-2">
      <div className="flex items-center space-x-1.5 text-xs font-semibold text-slate-800 tracking-tight">
        <span>{formattedTime}</span>
        <span className="text-slate-300">•</span>
        <span className="text-brand-700 font-bold">{shift}</span>
      </div>
      <span className="text-3xs text-slate-500 font-medium">{formattedDate}</span>
    </div>
  );
};
