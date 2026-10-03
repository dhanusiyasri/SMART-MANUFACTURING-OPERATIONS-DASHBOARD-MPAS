import React from 'react';
import { NavLink } from 'react-router-dom';
import { SIDEBAR_NAV_ITEMS } from '../../constants/navigation.js';
import { HiOutlineX, HiOutlineChartSquareBar, HiOutlineCog, HiOutlineChip, HiOutlineShieldCheck, HiOutlineDatabase, HiOutlineDocumentReport, HiOutlineAdjustments, HiOutlineUserGroup } from '../../icons/index.js';
import { APP_CONFIG } from '../../config/app.config.js';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  HiOutlineChartSquareBar,
  HiOutlineCog,
  HiOutlineChip,
  HiOutlineShieldCheck,
  HiOutlineDatabase,
  HiOutlineDocumentReport,
  HiOutlineAdjustments,
  HiOutlineUserGroup
};

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden animate-in fade-in duration-200">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs" onClick={onClose} />

      <div className="fixed inset-y-0 left-0 w-72 bg-white shadow-2xl flex flex-col z-50">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-lg bg-brand-800 flex items-center justify-center font-bold text-white text-xs">
              AL
            </div>
            <span className="text-sm font-bold text-slate-900">{APP_CONFIG.CLIENT_NAME}</span>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-700">
            <HiOutlineX className="w-5 h-5" />
          </button>
        </div>

        {/* Links */}
        <div className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {SIDEBAR_NAV_ITEMS.map((item) => {
            const IconComponent = iconMap[item.icon] || HiOutlineChartSquareBar;

            return (
              <NavLink
                key={item.id}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center px-3 py-2.5 rounded-xl font-medium text-xs transition-colors ${
                    isActive ? 'bg-brand-50 text-brand-700 font-semibold' : 'text-slate-600 hover:bg-slate-50'
                  }`
                }
              >
                <IconComponent className="w-5 h-5 mr-3 text-slate-500" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      </div>
    </div>
  );
};
