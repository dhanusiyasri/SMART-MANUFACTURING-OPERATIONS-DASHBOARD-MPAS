import React from 'react';
import {
  HiOutlineMenuAlt2,
  HiOutlineBell,
  HiOutlineSearch,
  HiOutlineSun,
  HiOutlineMoon,
  HiOutlineChevronLeft,
  HiOutlineChevronRight
} from '../../icons/index.js';
import { useTheme } from '../../hooks/useTheme.js';
import { useNotification } from '../../hooks/useNotification.js';
import { ProfileMenu } from './ProfileMenu.js';
import { APP_CONFIG } from '../../config/app.config.js';

interface TopHeaderProps {
  isCollapsed: boolean;
  onToggleSidebar: () => void;
  onToggleMobileDrawer: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  isCollapsed,
  onToggleSidebar,
  onToggleMobileDrawer
}) => {
  const { theme, toggleTheme } = useTheme();
  const { unreadCount, toggleDrawer } = useNotification();

  return (
    <header className="h-16 bg-white border-b border-slate-200 sticky top-0 z-30 flex items-center justify-between px-4 lg:px-6 shadow-xs">
      {/* Left Area: Logo & Sidebar Toggles */}
      <div className="flex items-center space-x-3">
        {/* Mobile Menu Button */}
        <button
          onClick={onToggleMobileDrawer}
          className="lg:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
          aria-label="Open Mobile Menu"
        >
          <HiOutlineMenuAlt2 className="w-6 h-6" />
        </button>

        {/* Desktop Collapse Button */}
        <button
          onClick={onToggleSidebar}
          className="hidden lg:flex p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200"
          aria-label="Toggle Sidebar"
        >
          {isCollapsed ? (
            <HiOutlineChevronRight className="w-5 h-5" />
          ) : (
            <HiOutlineChevronLeft className="w-5 h-5" />
          )}
        </button>

        {/* Ashok Leyland Branding */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-brand-800 flex items-center justify-center font-bold text-white text-sm tracking-wider">
            AL
          </div>
          <div className="hidden sm:block">
            <span className="text-base font-bold text-slate-900 tracking-tight block leading-none">
              {APP_CONFIG.CLIENT_NAME}
            </span>
            <span className="text-2xs font-medium text-brand-700 tracking-wider uppercase leading-none mt-1 block">
              Smart Manufacturing (MPAS)
            </span>
          </div>
        </div>
      </div>

      {/* Center Area: Global Search */}
      <div className="hidden md:flex items-center flex-1 max-w-md mx-6">
        <div className="relative w-full">
          <HiOutlineSearch className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search orders, machines, VINs, or SAP sequence plans..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Right Area: Actions, Notifications & Profile */}
      <div className="flex items-center space-x-3">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
          title="Toggle Dark/Light Mode"
        >
          {theme === 'dark' ? (
            <HiOutlineSun className="w-5 h-5 text-amber-500" />
          ) : (
            <HiOutlineMoon className="w-5 h-5" />
          )}
        </button>

        {/* Notification Bell Trigger */}
        <button
          onClick={toggleDrawer}
          className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors relative"
          title="Notifications"
        >
          <HiOutlineBell className="w-6 h-6" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-600 text-white text-3xs font-bold rounded-full flex items-center justify-center border-2 border-white">
              {unreadCount}
            </span>
          )}
        </button>

        <div className="h-6 w-px bg-slate-200" />

        {/* User Profile Dropdown */}
        <ProfileMenu />
      </div>
    </header>
  );
};
