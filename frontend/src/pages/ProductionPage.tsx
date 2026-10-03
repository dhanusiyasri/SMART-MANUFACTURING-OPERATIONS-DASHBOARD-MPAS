import React from 'react';
import { Card } from '../components/common/Card.js';
import { Badge } from '../components/common/Badge.js';

export const ProductionPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Production Operations</h1>
          <p className="text-xs text-slate-500">Live assembly line tracking, hourly output, and tactical metrics</p>
        </div>
        <Badge variant="blue">Assembly Line 1-4 Connected</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card title="Shift Target Output">
          <div className="text-2xl font-bold text-slate-900">450 Units</div>
        </Card>
        <Card title="Current Actual Output">
          <div className="text-2xl font-bold text-emerald-600">382 Units</div>
        </Card>
        <Card title="Tactical Bottlenecks">
          <div className="text-2xl font-bold text-amber-600">1 Detected</div>
        </Card>
      </div>
    </div>
  );
};

export default ProductionPage;
