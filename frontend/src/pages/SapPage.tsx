import React from 'react';
import { Card } from '../components/common/Card.js';
import { Badge } from '../components/common/Badge.js';

export const SapPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-slate-900">SAP Integration</h1>
          <p className="text-xs text-slate-500">SAP ERP synchronization status for SAP_ZPP_SEQ_PLAN</p>
        </div>
        <Badge variant="blue">SAP ERP Connected</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card title="Last Sync Executed">
          <div className="text-2xl font-bold text-slate-900">2 mins ago</div>
        </Card>
        <Card title="Pending SAP Orders">
          <div className="text-2xl font-bold text-brand-600">1,240 Orders</div>
        </Card>
        <Card title="Sync Errors">
          <div className="text-2xl font-bold text-emerald-600">0 Errors</div>
        </Card>
      </div>
    </div>
  );
};

export default SapPage;
