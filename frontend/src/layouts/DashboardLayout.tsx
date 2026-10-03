import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Topbar } from '../components/layout/Topbar/Topbar.js';
import { Sidebar } from '../components/layout/Sidebar/Sidebar.js';
import { MobileDrawer } from '../components/layout/MobileDrawer.js';
import { Breadcrumb } from '../components/layout/Breadcrumb/Breadcrumb.js';
import { ContentContainer } from '../components/layout/ContentContainer/ContentContainer.js';
import { NotificationDrawer } from '../components/layout/NotificationDrawer.js';
import { Footer } from '../components/layout/Footer/Footer.js';
import { useSidebar } from '../hooks/useSidebar.js';
import { LoadingSpinner } from '../components/common/LoadingSpinner.js';
import { ErrorBoundary } from '../components/common/ErrorBoundary.js';

export const DashboardLayout: React.FC = () => {
  const {
    isCollapsed,
    isMobileOpen,
    toggleSidebar,
    closeMobileDrawer,
    toggleMobileDrawer
  } = useSidebar();

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-white">
      {/* Top Navigation */}
      <Topbar
        isCollapsed={isCollapsed}
        onToggleSidebar={toggleSidebar}
        onToggleMobileDrawer={toggleMobileDrawer}
      />

      {/* Main Container: Sidebar fixed on left, main content scrolls independently */}
      <div className="flex-1 flex overflow-hidden min-h-0">
        {/* Collapsible Fixed Sidebar */}
        <Sidebar isCollapsed={isCollapsed} />

        {/* Responsive Mobile Drawer */}
        <MobileDrawer isOpen={isMobileOpen} onClose={closeMobileDrawer} />

        {/* Main Content Area (Independent Scroll Container) */}
        <main className="flex-1 flex flex-col min-w-0 bg-slate-50 overflow-y-auto p-4 lg:p-6">
          <ContentContainer>
            {/* Auto-generated Breadcrumb */}
            <Breadcrumb />

            {/* Page Content with ErrorBoundary & Suspense Fallbacks */}
            <ErrorBoundary>
              <Suspense fallback={<LoadingSpinner fullPage={false} label="Loading Industrial View..." />}>
                <Outlet />
              </Suspense>
            </ErrorBoundary>
          </ContentContainer>
        </main>

        {/* Notification Drawer Panel */}
        <NotificationDrawer />
      </div>

      {/* Compact Footer */}
      <Footer />
    </div>
  );
};
