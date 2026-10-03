import { z } from 'zod';

export const AnalyticsFilterSchema = z.object({
  plantCode: z.string().optional(),
  plant: z.string().optional(),
  lineCode: z.string().optional(),
  line: z.string().optional(),
  fromDate: z.string().optional(),
  startDate: z.string().optional(),
  toDate: z.string().optional(),
  endDate: z.string().optional(),
  shift: z.string().optional(),
  dateRange: z.string().optional(),
  month: z.string().optional(),
  materialCode: z.string().optional(),
  material: z.string().optional(),
  status: z.string().optional(),
  apiName: z.string().optional()
});

export type IAnalyticsFilterDTORaw = z.infer<typeof AnalyticsFilterSchema>;

export interface IAnalyticsFilterDTO {
  plantCode?: string;
  lineCode?: string;
  fromDate?: string;
  toDate?: string;
  shift?: string;
  dateRange?: string;
  month?: string;
  materialCode?: string;
  status?: string;
  apiName?: string;
}

/**
 * TASK 3: Normalizes filters and converts dateRange (this_week, this_month, last_month, 2025-10, etc.)
 * into strict fromDate and toDate strings before passing to Repository.
 * Repository NEVER receives "this_week" or dateRange strings.
 */
export function normalizeAnalyticsFilters(raw: IAnalyticsFilterDTO): IAnalyticsFilterDTO {
  const plantCode = raw.plantCode || '2004';
  const lineCode = raw.lineCode && raw.lineCode !== 'ALL' ? raw.lineCode : undefined;
  const shift = raw.shift && raw.shift !== 'ALL' ? raw.shift : undefined;
  const materialCode = raw.materialCode;

  let fromDate = raw.fromDate;
  let toDate = raw.toDate;

  const rawRange = (raw.dateRange || '').toLowerCase();
  const rawMonth = raw.month || (rawRange.match(/^\d{4}-\d{2}$/) ? rawRange : undefined);

  if (rawMonth && (!fromDate || !toDate)) {
    const parts = rawMonth.split('-');
    const year = parseInt(parts[0] || '2025', 10);
    const monthIdx = parseInt(parts[1] || '10', 10) - 1;
    const firstDay = new Date(Date.UTC(year, monthIdx, 1));
    const lastDay = new Date(Date.UTC(year, monthIdx + 1, 0));
    fromDate = firstDay.toISOString().split('T')[0];
    toDate = lastDay.toISOString().split('T')[0];
  } else if (!fromDate || !toDate) {
    const now = new Date();

    if (rawRange === 'today') {
      const todayStr = now.toISOString().split('T')[0];
      fromDate = todayStr;
      toDate = todayStr;
    } else if (rawRange === 'yesterday') {
      const yest = new Date(now);
      yest.setDate(yest.getDate() - 1);
      const yestStr = yest.toISOString().split('T')[0];
      fromDate = yestStr;
      toDate = yestStr;
    } else if (rawRange === 'this_week') {
      const day = now.getDay();
      const diffToMon = (day === 0 ? -6 : 1 - day);
      const mon = new Date(now);
      mon.setDate(now.getDate() + diffToMon);
      const sun = new Date(mon);
      sun.setDate(mon.getDate() + 6);

      fromDate = mon.toISOString().split('T')[0];
      toDate = sun.toISOString().split('T')[0];
    } else if (rawRange === 'this_month') {
      const firstDay = new Date(Date.UTC(now.getFullYear(), now.getMonth(), 1));
      const lastDay = new Date(Date.UTC(now.getFullYear(), now.getMonth() + 1, 0));
      fromDate = firstDay.toISOString().split('T')[0];
      toDate = lastDay.toISOString().split('T')[0];
    } else if (rawRange === 'last_month') {
      const firstDay = new Date(Date.UTC(now.getFullYear(), now.getMonth() - 1, 1));
      const lastDay = new Date(Date.UTC(now.getFullYear(), now.getMonth(), 0));
      fromDate = firstDay.toISOString().split('T')[0];
      toDate = lastDay.toISOString().split('T')[0];
    }
  }

  return {
    plantCode,
    lineCode,
    fromDate: fromDate || undefined,
    toDate: toDate || undefined,
    shift: shift || undefined,
    materialCode: materialCode || undefined,
    status: raw.status || undefined,
    apiName: raw.apiName || undefined
  };
}
