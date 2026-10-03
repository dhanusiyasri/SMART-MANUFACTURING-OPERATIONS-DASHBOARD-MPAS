import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes.js';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="py-8 text-center">
      <h2 className="text-4xl font-extrabold text-slate-900 mb-2">404</h2>
      <p className="text-base font-semibold text-slate-700 mb-2">Page Not Found</p>
      <p className="text-xs text-slate-500 max-w-sm mx-auto mb-6">
        The requested dashboard view does not exist or you do not have permission to access it.
      </p>
      <Link
        to={ROUTES.DASHBOARD.OVERVIEW}
        className="inline-flex items-center px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold rounded-lg transition-colors"
      >
        Back to Executive Overview
      </Link>
    </div>
  );
};

export default NotFoundPage;
