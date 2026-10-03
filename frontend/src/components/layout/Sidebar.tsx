import React from 'react';
import { NavLink } from 'react-router-dom';
import { SIDEBAR_NAV_ITEMS } from '../../constants/navigation.js';
import { Badge, BadgeVariant } from '../common/Badge.js';
import {
  HiOutlineChartSquareBar,
  HiOutlineCog,
  HiOutlineChip,
  HiOutlineShieldCheck,
  HiOutlineDatabase,
  HiOutlineDocumentReport,
  HiOutlineAdjustments,
  HiOutlineUserGroup
} from '../../icons/index.js';

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
      className={`hidden lg:flex flex-col bg-white border-r border-slate-200 transition-all duration-200 z-20 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Navigation Links */}
      <div className="flex-1 py-4 px-3 space-y-1.5 overflow-y-auto">
        {SIDEBAR_NAV_ITEMS.map((item) => {
          const IconComponent = iconMap[item.icon] || HiOutlineChartSquareBar;

          return (
            <NavLink
              key={item.id}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-3 py-2.5 rounded-xl font-medium text-xs transition-colors group relative ${
                  isActive
                    ? 'bg-brand-50 text-brand-700 font-semibold'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`
              }
              title={isCollapsed ? item.label : undefined}
            >
              <IconComponent className={`w-5 h-5 shrink-0 ${isCollapsed ? 'mx-auto' : 'mr-3'}`} />

              {!isCollapsed && <span className="truncate flex-1">{item.label}</span>}

              {!isCollapsed && item.badgeCount !== undefined && (
                <Badge variant={(item.badgeVariant as BadgeVariant) || 'blue'}>
                  {item.badgeCount}
                </Badge>
              )}

              {/* Tooltip on collapsed hover */}
              {isCollapsed && (
                <div className="absolute left-full ml-2 px-2.5 py-1 bg-slate-900 text-white text-xs rounded-md shadow-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap">
                  {item.label}
                </div>
              )}
            </NavLink>
          );
        })}
      </div>

      {/* Footer Info inside Sidebar */}
      {!isCollapsed && (
        <div className="p-4 border-t border-slate-100 bg-slate-50 text-3xs text-slate-500">
          <p className="font-semibold text-slate-700">Ashok Leyland MPAS</p>
          <p>Version 2.4.0 • Enterprise Edition</p>
        </div>
      )}
    </aside>
  );
};
