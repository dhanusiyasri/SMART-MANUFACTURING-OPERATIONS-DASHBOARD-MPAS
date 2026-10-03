import React from 'react';
import { Card } from '../components/common/Card.js';
import { Badge } from '../components/common/Badge.js';

export const QualityPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Quality & Traceability</h1>
          <p className="text-xs text-slate-500">First Time Pass (FTP) rate, VIN inspections, and defect logs</p>
        </div>
        <Badge variant="green">FTP Pass Rate 98.4%</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card title="First Time Pass (FTP)">
          <div className="text-2xl font-bold text-emerald-600">98.4%</div>
        </Card>
        <Card title="Inspections Completed Today">
          <div className="text-2xl font-bold text-slate-900">142 Vehicles</div>
        </Card>
        <Card title="Rework Queue">
          <div className="text-2xl font-bold text-amber-600">2 Pending</div>
        </Card>
      </div>
    </div>
  );
};

export default QualityPage;
