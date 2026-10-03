import React from 'react';
import { Card } from '../components/common/Card.js';

export const SettingsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Dashboard Settings</h1>
        <p className="text-xs text-slate-500">System preferences, widget refresh rates, and notification thresholds</p>
      </div>
      <Card title="System Preferences">
        <p className="text-xs text-slate-600">Enterprise telemetry configurations and threshold settings.</p>
      </Card>
    </div>
  );
};

export default SettingsPage;
