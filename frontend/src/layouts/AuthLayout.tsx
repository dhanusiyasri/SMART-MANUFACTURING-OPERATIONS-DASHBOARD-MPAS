import React from 'react';
import { Outlet } from 'react-router-dom';
import { APP_CONFIG } from '../config/app.config.js';

export const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 border border-slate-200">
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-brand-800 text-white font-extrabold text-xl flex items-center justify-center mx-auto mb-3 shadow-md">
            AL
          </div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">{APP_CONFIG.CLIENT_NAME}</h1>
          <p className="text-xs text-slate-500 font-medium mt-1">{APP_CONFIG.APP_NAME}</p>
        </div>
        <Outlet />
      </div>
    </div>
  );
};
