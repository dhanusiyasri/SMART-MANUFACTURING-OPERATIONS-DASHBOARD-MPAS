/**
 * Enterprise Palette Definitions
 * Aligned with Ashok Leyland Industrial Design System, Power BI, and Grafana Enterprise.
 */

export const ANALYTICS_COLORS = {
  // Status Colors
  success: '#10B981',
  info: '#2563EB',
  warning: '#F59E0B',
  danger: '#EF4444',
  neutral: '#64748B',

  // Criticality Levels (API & ERP Exceptions)
  level1Critical: '#DC2626',
  level2High: '#F59E0B',
  level3Medium: '#2563EB',

  // Plant & Line Palette
  primaryPlant: '#2563EB',
  secondaryPlant: '#10B981',
  tertiaryPlant: '#F59E0B',
  quaternaryPlant: '#8B5CF6',

  // Chart Gradients
  areaGradientStart: 'rgba(37, 99, 235, 0.35)',
  areaGradientEnd: 'rgba(37, 99, 235, 0.01)',

  // Dark / Slate Theme Extensions
  slate900: '#0F172A',
  slate700: '#334155',
  slate500: '#64748B',
  slate200: '#E2E8F0',
  slate50: '#F8FAFC'
} as const;

export type AnalyticsColorKey = keyof typeof ANALYTICS_COLORS;
