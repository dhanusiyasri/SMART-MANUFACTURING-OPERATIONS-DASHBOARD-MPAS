import { useState, useEffect } from 'react';

export const useSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(() => {
    const saved = localStorage.getItem('mpas_sidebar_collapsed');
    return saved ? JSON.parse(saved) : false;
  });

  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem('mpas_sidebar_collapsed', JSON.stringify(isCollapsed));
  }, [isCollapsed]);

  const toggleSidebar = () => setIsCollapsed((prev) => !prev);
  const openMobileDrawer = () => setIsMobileOpen(true);
  const closeMobileDrawer = () => setIsMobileOpen(false);
  const toggleMobileDrawer = () => setIsMobileOpen((prev) => !prev);

  return {
    isCollapsed,
    isMobileOpen,
    toggleSidebar,
    openMobileDrawer,
    closeMobileDrawer,
    toggleMobileDrawer
  };
};
