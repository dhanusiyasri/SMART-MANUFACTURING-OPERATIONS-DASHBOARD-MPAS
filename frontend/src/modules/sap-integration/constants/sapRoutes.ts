export const SAP_ROUTES = {
  ROOT: '/dashboard/sap',
  OVERVIEW: '/dashboard/sap/overview',
  ORDERS: '/dashboard/sap/orders',
  ERRORS: '/dashboard/sap/errors',
  SYNCHRONIZATION: '/dashboard/sap/synchronization',
  FINISHED_GOODS: '/dashboard/sap/finished-goods',
  MASTER_DATA: '/dashboard/sap/master-data'
} as const;

export interface ISapTabItem {
  id: string;
  label: string;
  path: string;
  badgeCount?: number;
  badgeVariant?: 'blue' | 'amber' | 'red' | 'green';
}

export const SAP_TAB_ITEMS: ISapTabItem[] = [
  {
    id: 'overview',
    label: 'Overview',
    path: SAP_ROUTES.OVERVIEW
  },
  {
    id: 'orders',
    label: 'Production Orders',
    path: SAP_ROUTES.ORDERS
  },
  {
    id: 'errors',
    label: 'API Errors',
    path: SAP_ROUTES.ERRORS,
    badgeCount: 5,
    badgeVariant: 'red'
  },
  {
    id: 'synchronization',
    label: 'Synchronization',
    path: SAP_ROUTES.SYNCHRONIZATION
  },
  {
    id: 'finished-goods',
    label: 'Finished Goods',
    path: SAP_ROUTES.FINISHED_GOODS
  },
  {
    id: 'master-data',
    label: 'Master Data',
    path: SAP_ROUTES.MASTER_DATA
  }
];
