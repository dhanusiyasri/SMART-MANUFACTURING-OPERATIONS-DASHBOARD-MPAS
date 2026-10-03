import React from 'react';
import { Card } from '../components/common/Card.js';
import { Badge } from '../components/common/Badge.js';

export const MachinesPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Machine & Maintenance</h1>
          <p className="text-xs text-slate-500">CNC, Robot Cell, and Conveyor Sensor Telemetry</p>
        </div>
        <Badge variant="green">Sensors Online</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card title="Active Robotic Cells">
          <div className="text-2xl font-bold text-slate-900">24 / 24 Active</div>
        </Card>
        <Card title="Preventive Maintenance Schedule">
          <div className="text-2xl font-bold text-brand-600">3 Due Today</div>
        </Card>
        <Card title="Mean Time Between Failures (MTBF)">
          <div className="text-2xl font-bold text-slate-900">340 Hours</div>
        </Card>
      </div>
    </div>
  );
};

export default MachinesPage;
