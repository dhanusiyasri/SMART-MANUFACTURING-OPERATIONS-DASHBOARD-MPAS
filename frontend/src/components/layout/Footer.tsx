import React from 'react';
import { APP_CONFIG } from '../../config/app.config.js';

export const Footer: React.FC = () => {
  return (
    <footer className="h-10 bg-white border-t border-slate-200 px-6 flex items-center justify-between text-3xs text-slate-500">
      <div>
        <span>© {new Date().getFullYear()} {APP_CONFIG.CLIENT_NAME} Ltd. All Rights Reserved.</span>
        <span className="mx-2">•</span>
        <span>Plant Location: {APP_CONFIG.PLANT_LOCATION}</span>
      </div>
      <div className="flex items-center space-x-2">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="font-semibold text-slate-700">System Online</span>
      </div>
    </footer>
  );
};
