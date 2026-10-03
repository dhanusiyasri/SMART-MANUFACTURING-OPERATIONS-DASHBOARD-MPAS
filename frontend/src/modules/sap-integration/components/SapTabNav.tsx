import React from 'react';
import { NavLink } from 'react-router-dom';
import { SAP_TAB_ITEMS } from '../constants/sapRoutes.js';
import { Badge, BadgeVariant } from '../../../components/common/Badge.js';

export const SapTabNav: React.FC = () => {
  return (
    <div className="border-b border-slate-200 bg-white rounded-t-xl px-2 pt-2">
      <nav className="flex space-x-1 overflow-x-auto" aria-label="SAP Module Tabs">
        {SAP_TAB_ITEMS.map((tab) => (
          <NavLink
            key={tab.id}
            to={tab.path}
            end={tab.id === 'overview'}
            className={({ isActive }) =>
              `flex items-center space-x-2 px-4 py-2.5 text-xs font-medium rounded-t-lg transition-colors border-b-2 whitespace-nowrap ${
                isActive
                  ? 'border-brand-600 text-brand-700 bg-brand-50/50 font-bold'
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`
            }
          >
            <span>{tab.label}</span>
            {tab.badgeCount !== undefined && (
              <Badge variant={(tab.badgeVariant as BadgeVariant) || 'blue'}>
                {tab.badgeCount}
              </Badge>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};
