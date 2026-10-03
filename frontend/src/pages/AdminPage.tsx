import React from 'react';
import { Card } from '../components/common/Card.js';
import { Badge } from '../components/common/Badge.js';

export const AdminPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Administration & Access Control</h1>
          <p className="text-xs text-slate-500">Role-Based Access Control (RBAC), user permissions, and audit logs</p>
        </div>
        <Badge variant="red">Restricted Admin Access</Badge>
      </div>
      <Card title="Role Management">
        <p className="text-xs text-slate-600">Configure plant operator, quality inspector, and plant manager roles.</p>
      </Card>
    </div>
  );
};

export default AdminPage;
