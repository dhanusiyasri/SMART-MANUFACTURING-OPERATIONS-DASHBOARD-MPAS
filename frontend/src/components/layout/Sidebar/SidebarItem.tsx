import React from 'react';
import { NavLink } from 'react-router-dom';
import { Badge, BadgeVariant } from '../../common/Badge.js';

interface SidebarItemProps {
  label: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  badgeCount?: number;
  badgeVariant?: BadgeVariant;
  isCollapsed: boolean;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({
  label,
  path,
  icon: IconComponent,
  badgeCount,
  badgeVariant = 'blue',
  isCollapsed
}) => {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `flex items-center px-3 py-2.5 rounded-xl font-medium text-xs transition-colors group relative ${
          isActive
            ? 'bg-brand-50 text-brand-700 font-semibold shadow-2xs'
            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
        }`
      }
      title={isCollapsed ? label : undefined}
    >
      <IconComponent className={`w-5 h-5 shrink-0 ${isCollapsed ? 'mx-auto' : 'mr-3'}`} />

      {!isCollapsed && <span className="truncate flex-1">{label}</span>}

      {!isCollapsed && badgeCount !== undefined && (
        <Badge variant={badgeVariant}>{badgeCount}</Badge>
      )}

      {/* Tooltip on collapsed hover */}
      {isCollapsed && (
        <div className="absolute left-full ml-2 px-2.5 py-1 bg-slate-900 text-white text-xs rounded-md shadow-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap">
          {label}
        </div>
      )}
    </NavLink>
  );
};
