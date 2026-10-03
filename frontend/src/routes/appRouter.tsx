import { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { DashboardLayout } from '../layouts/DashboardLayout.js';
import { ErrorLayout } from '../layouts/ErrorLayout.js';
import { ROUTES } from '../constants/routes.js';

// Top-Level Lazy-Loaded Module Views
const OverviewPage = lazy(() => import('../pages/OverviewPage.js'));
const ProductionPage = lazy(() => import('../pages/ProductionPage.js'));
const MachinesPage = lazy(() => import('../pages/MachinesPage.js'));
const QualityPage = lazy(() => import('../pages/QualityPage.js'));
const ReportsPage = lazy(() => import('../pages/ReportsPage.js'));
const SettingsPage = lazy(() => import('../pages/SettingsPage.js'));
const AdminPage = lazy(() => import('../pages/AdminPage.js'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage.js'));

// Module 5 — SAP Integration Control Center Views
const SapLayoutPage = lazy(() => import('../modules/sap-integration/pages/SapLayoutPage.js'));
const SapOverviewTab = lazy(() => import('../modules/sap-integration/pages/OverviewPage.js'));
const SapOrdersTab = lazy(() => import('../modules/sap-integration/pages/ProductionOrdersPage.js'));
const SapErrorsTab = lazy(() => import('../modules/sap-integration/pages/ApiErrorPage.js'));
const SapSyncTab = lazy(() => import('../modules/sap-integration/pages/SynchronizationPage.js'));
const SapFgTab = lazy(() => import('../modules/sap-integration/pages/FinishedGoodsPage.js'));
const SapMasterDataTab = lazy(() => import('../modules/sap-integration/pages/MasterDataPage.js'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to={ROUTES.DASHBOARD.OVERVIEW} replace />
  },
  {
    path: ROUTES.DASHBOARD.ROOT,
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Navigate to={ROUTES.DASHBOARD.OVERVIEW} replace />
      },
      {
        path: 'overview',
        element: <OverviewPage />
      },
      {
        path: 'production',
        element: <ProductionPage />
      },
      {
        path: 'machines',
        element: <MachinesPage />
      },
      {
        path: 'quality',
        element: <QualityPage />
      },
      {
        /* Module 5 — SAP Integration Control Center Shell */
        path: 'sap',
        element: <SapLayoutPage />,
        children: [
          {
            index: true,
            element: <Navigate to="/dashboard/sap/overview" replace />
          },
          {
            path: 'overview',
            element: <SapOverviewTab />
          },
          {
            path: 'orders',
            element: <SapOrdersTab />
          },
          {
            path: 'errors',
            element: <SapErrorsTab />
          },
          {
            path: 'synchronization',
            element: <SapSyncTab />
          },
          {
            path: 'finished-goods',
            element: <SapFgTab />
          },
          {
            path: 'master-data',
            element: <SapMasterDataTab />
          }
        ]
      },
      {
        path: 'reports',
        element: <ReportsPage />
      },
      {
        path: 'settings',
        element: <SettingsPage />
      },
      {
        path: 'admin',
        element: <AdminPage />
      }
    ]
  },
  {
    path: '*',
    element: <ErrorLayout />,
    children: [
      {
        path: '*',
        element: <NotFoundPage />
      }
    ]
  }
]);
