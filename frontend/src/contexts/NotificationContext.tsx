import React, { createContext, useState, ReactNode } from 'react';
import { AppNotification } from '../types/index.js';

export interface INotificationContext {
  notifications: AppNotification[];
  unreadCount: number;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
  markAsRead: (id: string) => void;
  clearAll: () => void;
  addNotification: (notification: Omit<AppNotification, 'id' | 'timestamp' | 'read'>) => void;
}

export const NotificationContext = createContext<INotificationContext | undefined>(undefined);

const initialNotifications: AppNotification[] = [
  {
    id: 'n-1',
    title: 'SAP Sync Completed',
    message: 'Sequence plan SAP_ZPP_SEQ_PLAN sync executed successfully.',
    timestamp: '5 mins ago',
    type: 'SUCCESS',
    read: false,
    category: 'SAP'
  },
  {
    id: 'n-2',
    title: 'Assembly Line Warning',
    message: 'Line 2 Engine Assembly experiencing minor cycle delay (+12s).',
    timestamp: '15 mins ago',
    type: 'WARNING',
    read: false,
    category: 'MACHINE'
  },
  {
    id: 'n-3',
    title: 'Quality Check Cleared',
    message: 'Chassis VIN #48201 passed 100-point inspection.',
    timestamp: '1 hour ago',
    type: 'INFO',
    read: true,
    category: 'QUALITY'
  }
];

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<AppNotification[]>(initialNotifications);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);
  const toggleDrawer = () => setIsDrawerOpen((prev) => !prev);

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const clearAll = () => setNotifications([]);

  const addNotification = (item: Omit<AppNotification, 'id' | 'timestamp' | 'read'>) => {
    const newNotif: AppNotification = {
      ...item,
      id: `n-${Date.now()}`,
      timestamp: 'Just now',
      read: false
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        isDrawerOpen,
        openDrawer,
        closeDrawer,
        toggleDrawer,
        markAsRead,
        clearAll,
        addNotification
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
