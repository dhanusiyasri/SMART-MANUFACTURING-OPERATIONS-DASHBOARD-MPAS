import React from 'react';
import { Card } from '../components/common/Card.js';

export const ReportsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Reports & Analytics</h1>
        <p className="text-xs text-slate-500">Historical shift reports, OEE trends, and export utilities</p>
      </div>
      <Card title="Shift Performance Summary">
        <p className="text-xs text-slate-600">Report generation modules prepped for PDF/Excel download.</p>
      </Card>
    </div>
  );
};

export default ReportsPage;
