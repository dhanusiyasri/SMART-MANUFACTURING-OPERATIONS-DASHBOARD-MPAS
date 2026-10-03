import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { NavigationSubitem } from '../../../types/index.js';
import { Badge, BadgeVariant } from '../../common/Badge.js';
import { HiOutlineChevronDown, HiOutlineChevronRight } from '../../../icons/index.js';

interface SidebarSubmenuProps {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  children: NavigationSubitem[];
  isCollapsed: boolean;
}

export const SidebarSubmenu: React.FC<SidebarSubmenuProps> = ({
  label,
  icon: IconComponent,
  children,
  isCollapsed
}) => {
  const location = useLocation();
  const isAnyChildActive = children.some((child) => location.pathname === child.path);
  const [isOpen, setIsOpen] = useState<boolean>(isAnyChildActive);

  if (isCollapsed) {
    return (
      <div className="relative group">
        <button
          className={`w-full flex items-center justify-center py-2.5 rounded-xl transition-colors ${
            isAnyChildActive ? 'bg-brand-50 text-brand-700' : 'text-slate-600 hover:bg-slate-50'
          }`}
          title={label}
        >
          <IconComponent className="w-5 h-5" />
        </button>

        {/* Hover Dropdown Popup when Collapsed */}
        <div className="absolute left-full top-0 ml-2 w-48 bg-white border border-slate-200 rounded-xl shadow-lg py-2 hidden group-hover:block z-50 animate-in fade-in duration-150">
          <div className="px-3 py-1 text-3xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
            {label}
          </div>
          {children.map((sub) => (
            <NavLink
              key={sub.id}
              to={sub.path}
              className={({ isActive }) =>
                `block px-3 py-1.5 text-xs transition-colors ${
                  isActive ? 'bg-brand-50 text-brand-700 font-semibold' : 'text-slate-700 hover:bg-slate-50'
                }`
              }
            >
              {sub.label}
            </NavLink>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium text-xs transition-colors ${
          isAnyChildActive
            ? 'bg-brand-50/60 text-brand-800 font-semibold'
            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
        }`}
      >
        <div className="flex items-center space-x-3">
          <IconComponent className="w-5 h-5 shrink-0 text-slate-500" />
          <span className="truncate">{label}</span>
        </div>
        {isOpen ? (
          <HiOutlineChevronDown className="w-4 h-4 text-slate-400" />
        ) : (
          <HiOutlineChevronRight className="w-4 h-4 text-slate-400" />
        )}
      </button>

      {isOpen && (
        <div className="pl-9 pr-2 space-y-1 pt-0.5">
          {children.map((sub) => (
            <NavLink
              key={sub.id}
              to={sub.path}
              className={({ isActive }) =>
                `flex items-center justify-between px-3 py-1.5 rounded-lg text-xs transition-colors ${
                  isActive
                    ? 'bg-brand-600 text-white font-semibold shadow-2xs'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`
              }
            >
              <span className="truncate">{sub.label}</span>
              {sub.badgeCount !== undefined && (
                <Badge variant={(sub.badgeVariant as BadgeVariant) || 'blue'}>
                  {sub.badgeCount}
                </Badge>
              )}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
};
