import React from 'react';
import { HiOutlineMenuAlt2, HiOutlineChevronLeft, HiOutlineChevronRight } from '../../../icons/index.js';
import { PlantLineSelector } from './PlantLineSelector.js';
import { SearchBar } from './SearchBar.js';
import { DateTimeDisplay } from './DateTimeDisplay.js';
import { NotificationBell } from './NotificationBell.js';
import { ThemeSwitcher } from './ThemeSwitcher.js';
import { ProfileMenu } from '../ProfileMenu.js';
import { APP_CONFIG } from '../../../config/app.config.js';

interface TopbarProps {
  isCollapsed: boolean;
  onToggleSidebar: () => void;
  onToggleMobileDrawer: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({
  isCollapsed,
  onToggleSidebar,
  onToggleMobileDrawer
}) => {
  return (
    <header className="h-16 bg-white border-b border-slate-200 sticky top-0 z-30 flex items-center justify-between px-4 lg:px-6 shadow-2xs">
      {/* Left Section: Branding & Navigation Toggles */}
      <div className="flex items-center space-x-3">
        {/* Mobile Menu Button */}
        <button
          onClick={onToggleMobileDrawer}
          className="lg:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
          aria-label="Open Navigation Drawer"
        >
          <HiOutlineMenuAlt2 className="w-5 h-5" />
        </button>

        {/* Desktop Collapse Button */}
        <button
          onClick={onToggleSidebar}
          className="hidden lg:flex p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200"
          aria-label="Toggle Sidebar"
          title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {isCollapsed ? (
            <HiOutlineChevronRight className="w-4 h-4" />
          ) : (
            <HiOutlineChevronLeft className="w-4 h-4" />
          )}
        </button>

        {/* Branding Logo */}
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-brand-800 flex items-center justify-center font-black text-white text-xs tracking-wider shadow-xs">
            AL
          </div>
          <div className="hidden sm:block">
            <span className="text-sm font-bold text-slate-900 tracking-tight block leading-none">
              {APP_CONFIG.CLIENT_NAME}
            </span>
            <span className="text-3xs font-semibold text-brand-700 tracking-wider uppercase leading-none mt-1 block">
              Smart Manufacturing (MPAS)
            </span>
          </div>
        </div>

        {/* Plant & Assembly Line Selector */}
        <div className="hidden lg:block ml-4 pl-4 border-l border-slate-200">
          <PlantLineSelector />
        </div>
      </div>

      {/* Center Section: Global Search Bar */}
      <SearchBar />

      {/* Right Section: Time, Notifications, Theme, Profile */}
      <div className="flex items-center space-x-2">
        <DateTimeDisplay />
        <NotificationBell />
        <ThemeSwitcher />
        <div className="h-5 w-px bg-slate-200 mx-1 hidden sm:block" />
        <ProfileMenu />
      </div>
    </header>
  );
};
