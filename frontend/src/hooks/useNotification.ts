import { useContext } from 'react';
import { NotificationContext, INotificationContext } from '../contexts/NotificationContext.js';

export const useNotification = (): INotificationContext => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};
