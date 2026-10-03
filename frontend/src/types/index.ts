export type ThemeMode = 'light' | 'dark' | 'system';

export type UserRole = 'ADMIN' | 'EXECUTIVE' | 'PLANT_MANAGER' | 'OPERATOR' | 'QUALITY_INSPECTOR';

export type NotificationType = 'INFO' | 'SUCCESS' | 'WARNING' | 'CRITICAL';

export interface PlantLocation {
  id: string;
  name: string;
  code: string;
}

export interface ProductionLine {
  id: string;
  name: string;
  plantId: string;
  code: string;
}

export interface NavigationSubitem {
  id: string;
  label: string;
  path: string;
  badgeCount?: number;
  badgeVariant?: 'blue' | 'amber' | 'red' | 'green';
  roles?: UserRole[];
}

export interface NavigationItem {
  id: string;
  label: string;
  path: string;
  icon: string;
  badgeCount?: number;
  badgeVariant?: 'blue' | 'amber' | 'red' | 'green';
  roles?: UserRole[];
  children?: NavigationSubitem[];
}

export interface BreadcrumbItem {
  label: string;
  path?: string;
  active?: boolean;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: NotificationType;
  read: boolean;
  category?: 'SAP' | 'MACHINE' | 'QUALITY' | 'SYSTEM';
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  plantId: string;
  plantName: string;
  avatarUrl?: string;
}
