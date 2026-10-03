import { NavigationItem } from '../types/index.js';
import { ROUTES } from './routes.js';

export const SIDEBAR_NAV_ITEMS: NavigationItem[] = [
  {
    id: 'dashboard-overview',
    label: 'Executive Overview',
    path: ROUTES.DASHBOARD.OVERVIEW,
    icon: 'HiOutlineChartSquareBar'
  },
  {
    id: 'production-operations',
    label: 'Production Operations',
    path: ROUTES.DASHBOARD.PRODUCTION,
    icon: 'HiOutlineCog',
    badgeCount: 3,
    badgeVariant: 'amber',
    children: [
      {
        id: 'prod-line-status',
        label: 'Line Output Status',
        path: ROUTES.DASHBOARD.PRODUCTION
      },
      {
        id: 'prod-bottlenecks',
        label: 'Tactical Bottlenecks',
        path: ROUTES.DASHBOARD.PRODUCTION,
        badgeCount: 1,
        badgeVariant: 'amber'
      }
    ]
  },
  {
    id: 'machine-maintenance',
    label: 'Machine & Maintenance',
    path: ROUTES.DASHBOARD.MACHINES,
    icon: 'HiOutlineChip'
  },
  {
    id: 'quality-traceability',
    label: 'Quality & Traceability',
    path: ROUTES.DASHBOARD.QUALITY,
    icon: 'HiOutlineShieldCheck'
  },
  {
    id: 'sap-integration',
    label: 'SAP Integration',
    path: ROUTES.DASHBOARD.SAP,
    icon: 'HiOutlineDatabase',
    badgeCount: 12,
    badgeVariant: 'blue',
    children: [
      {
        id: 'sap-sequence-plan',
        label: 'ZPP Sequence Plan',
        path: ROUTES.DASHBOARD.SAP
      },
      {
        id: 'sap-sync-logs',
        label: 'Sync Audit Logs',
        path: ROUTES.DASHBOARD.SAP
      }
    ]
  },
  {
    id: 'reports',
    label: 'Reports & Analytics',
    path: ROUTES.DASHBOARD.REPORTS,
    icon: 'HiOutlineDocumentReport'
  },
  {
    id: 'settings',
    label: 'Settings',
    path: ROUTES.DASHBOARD.SETTINGS,
    icon: 'HiOutlineAdjustments'
  },
  {
    id: 'admin',
    label: 'Administration',
    path: ROUTES.DASHBOARD.ADMIN,
    icon: 'HiOutlineUserGroup',
    roles: ['ADMIN']
  }
];
