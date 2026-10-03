import React from 'react';
import { HiOutlineBell } from '../../../icons/index.js';
import { useNotification } from '../../../hooks/useNotification.js';

export const NotificationBell: React.FC = () => {
  const { unreadCount, toggleDrawer } = useNotification();

  return (
    <button
      onClick={toggleDrawer}
      className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors relative"
      aria-label={`Notifications - ${unreadCount} unread`}
      title="Notifications & Live Alerts"
    >
      <HiOutlineBell className="w-5 h-5" />
      {unreadCount > 0 && (
        <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-600 text-white text-3xs font-extrabold rounded-full flex items-center justify-center border-2 border-white shadow-xs">
          {unreadCount}
        </span>
      )}
    </button>
  );
};
