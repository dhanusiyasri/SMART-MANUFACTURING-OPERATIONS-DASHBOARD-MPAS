import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes.js';
import { APP_CONFIG } from '../config/app.config.js';

export const ErrorLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-brand-800 text-white font-extrabold text-2xl flex items-center justify-center mb-4 shadow-md">
        AL
      </div>
      <h1 className="text-2xl font-bold text-slate-900 mb-1">{APP_CONFIG.CLIENT_NAME}</h1>
      <p className="text-xs text-slate-500 mb-8">{APP_CONFIG.APP_NAME}</p>
      
      <div className="max-w-md w-full bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
        <Outlet />
        <div className="mt-6 pt-4 border-t border-slate-100">
          <Link
            to={ROUTES.DASHBOARD.OVERVIEW}
            className="inline-flex items-center px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold rounded-lg transition-colors"
          >
            Return to Executive Overview
          </Link>
        </div>
      </div>
    </div>
  );
};
