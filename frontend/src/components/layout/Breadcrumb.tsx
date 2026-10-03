import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HiOutlineChevronRight } from '../../icons/index.js';
import { ROUTES } from '../../constants/routes.js';

const routeNameMap: Record<string, string> = {
  dashboard: 'Dashboard',
  overview: 'Executive Overview',
  production: 'Production Operations',
  machines: 'Machine & Maintenance',
  quality: 'Quality & Traceability',
  sap: 'SAP Integration',
  reports: 'Reports & Analytics',
  settings: 'Settings',
  admin: 'Administration'
};

export const Breadcrumb: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex items-center space-x-2 text-xs text-slate-500">
        <li>
          <Link to={ROUTES.DASHBOARD.OVERVIEW} className="hover:text-brand-600 transition-colors font-medium">
            Home
          </Link>
        </li>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          const label = routeNameMap[value.toLowerCase()] || value.toUpperCase();

          return (
            <li key={to} className="flex items-center space-x-2">
              <HiOutlineChevronRight className="w-3.5 h-3.5 text-slate-400" />
              {isLast ? (
                <span className="font-semibold text-slate-900">{label}</span>
              ) : (
                <Link to={to} className="hover:text-brand-600 transition-colors font-medium">
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
