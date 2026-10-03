import React from 'react';
import { useNotification } from '../../hooks/useNotification.js';
import { HiOutlineX, HiOutlineCheckCircle, HiOutlineExclamationCircle } from '../../icons/index.js';
import { Badge } from '../common/Badge.js';

export const NotificationDrawer: React.FC = () => {
  const { notifications, isDrawerOpen, closeDrawer, markAsRead, clearAll } = useNotification();

  if (!isDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-xs" onClick={closeDrawer} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl border-l border-slate-200 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
            <div>
              <h2 className="text-base font-bold text-slate-900">Notifications & Alerts</h2>
              <p className="text-xs text-slate-500">Live system updates and telemetry alerts</p>
            </div>
            <button
              onClick={closeDrawer}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <HiOutlineX className="w-5 h-5" />
            </button>
          </div>

          {/* Action Toolbar */}
          {notifications.length > 0 && (
            <div className="px-4 py-2 border-b border-slate-100 bg-white flex justify-between items-center text-xs">
              <span className="text-slate-500">{notifications.length} total notifications</span>
              <button
                onClick={clearAll}
                className="text-brand-600 hover:text-brand-800 font-medium"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Notification List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {notifications.length === 0 ? (
              <div className="text-center py-12 text-slate-400">
                <HiOutlineCheckCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p className="text-sm font-medium">No new notifications</p>
              </div>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.id}
                  onClick={() => markAsRead(n.id)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    n.read
                      ? 'bg-slate-50 border-slate-200 opacity-75'
                      : 'bg-white border-brand-200 shadow-xs ring-1 ring-brand-100'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      {n.type === 'CRITICAL' || n.type === 'WARNING' ? (
                        <HiOutlineExclamationCircle
                          className={`w-5 h-5 ${
                            n.type === 'CRITICAL' ? 'text-red-500' : 'text-amber-500'
                          }`}
                        />
                      ) : (
                        <HiOutlineCheckCircle className="w-5 h-5 text-emerald-500" />
                      )}
                      <h4 className="text-xs font-bold text-slate-900">{n.title}</h4>
                    </div>
                    {n.category && (
                      <Badge
                        variant={
                          n.type === 'CRITICAL'
                            ? 'red'
                            : n.type === 'WARNING'
                            ? 'amber'
                            : 'blue'
                        }
                      >
                        {n.category}
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{n.message}</p>
                  <span className="text-3xs text-slate-400 font-medium mt-2 block">
                    {n.timestamp}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
