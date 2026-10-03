import React from 'react';
import { SIDEBAR_NAV_ITEMS } from '../../../constants/navigation.js';
import { SidebarItem } from './SidebarItem.js';
import { SidebarSubmenu } from './SidebarSubmenu.js';
import { BadgeVariant } from '../../common/Badge.js';
import {
  HiOutlineChartSquareBar,
  HiOutlineCog,
  HiOutlineChip,
  HiOutlineShieldCheck,
  HiOutlineDatabase,
  HiOutlineDocumentReport,
  HiOutlineAdjustments,
  HiOutlineUserGroup
} from '../../../icons/index.js';

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

interface SidebarProps {
  isCollapsed: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ isCollapsed }) => {
  return (
    <aside
      className={`hidden lg:flex flex-col bg-white border-r border-slate-200 transition-all duration-200 z-20 shrink-0 h-full ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
      aria-label="Main Application Sidebar"
    >
      {/* Menu Container */}
      <div className="flex-1 py-4 px-3 space-y-1.5 overflow-y-auto">
        {SIDEBAR_NAV_ITEMS.map((item) => {
          const IconComponent = iconMap[item.icon] || HiOutlineChartSquareBar;

          if (item.children && item.children.length > 0) {
            return (
              <SidebarSubmenu
                key={item.id}
                label={item.label}
                icon={IconComponent}
                children={item.children}
                isCollapsed={isCollapsed}
              />
            );
          }

          return (
            <SidebarItem
              key={item.id}
              label={item.label}
              path={item.path}
              icon={IconComponent}
              badgeCount={item.badgeCount}
              badgeVariant={item.badgeVariant as BadgeVariant}
              isCollapsed={isCollapsed}
            />
          );
        })}
      </div>
    </aside>
  );
};
