import React, { memo } from 'react';
import { AnalyticsCard } from '../AnalyticsCard.js';

export interface LatestFgRow {
  rowInsertTime: string;
  sequenceNumber: string;
  orderNo: string;
  materialCode: string;
  lineCode: string;
  sapStatusCode: number | string;
}

interface LatestFgTableProps {
  records: LatestFgRow[];
  loading?: boolean;
  error?: Error | null;
  onRowClick?: (row: LatestFgRow) => void;
}

export const LatestFgTable: React.FC<LatestFgTableProps> = memo(({
  records,
  loading = false,
  error = null,
  onRowClick
}) => {
  return (
    <AnalyticsCard
      title="8. Latest Finished Goods Execution Ledger (SAP_FG)"
      subtitle="Live Finished Goods Receipts & Movement 101 Postings"
      tooltipText="Real-time execution ledger directly from SAP_FG SQL Server table"
      loading={loading}
      error={error}
    >
      <div className="overflow-x-auto max-h-[280px] overflow-y-auto">
        <table className="w-full text-left text-xs border-collapse" aria-label="Latest Finished Goods Execution Ledger Table">
          <thead className="bg-slate-100/90 sticky top-0 z-10 text-3xs font-extrabold text-slate-500 uppercase tracking-wider border-b border-slate-200">
            <tr>
              <th className="px-3 py-2">RowInsertTime</th>
              <th className="px-3 py-2">SequenceNumber</th>
              <th className="px-3 py-2">OrderNo</th>
              <th className="px-3 py-2">MaterialCode</th>
              <th className="px-3 py-2">LineCode</th>
              <th className="px-3 py-2 text-right">SAPStatusCode</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs font-mono">
            {records.map((r, idx) => (
              <tr
                key={`${r.sequenceNumber}-${idx}`}
                onClick={() => onRowClick && onRowClick(r)}
                className={`hover:bg-slate-50 transition-colors ${onRowClick ? 'cursor-pointer' : ''}`}
              >
                <td className="px-3 py-2 text-slate-500 whitespace-nowrap">{r.rowInsertTime}</td>
                <td className="px-3 py-2 font-bold text-slate-900 whitespace-nowrap">{r.sequenceNumber}</td>
                <td className="px-3 py-2 text-brand-700 whitespace-nowrap">{r.orderNo}</td>
                <td className="px-3 py-2 text-slate-700 whitespace-nowrap">{r.materialCode}</td>
                <td className="px-3 py-2 font-bold text-blue-700 whitespace-nowrap">{r.lineCode}</td>
                <td className="px-3 py-2 text-right whitespace-nowrap">
                  <span
                    className={`px-2 py-0.5 rounded text-3xs font-extrabold ${
                      String(r.sapStatusCode) === '1' || String(r.sapStatusCode) === 'S' || String(r.sapStatusCode) === 'SUCCESS'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}
                  >
                    {r.sapStatusCode}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AnalyticsCard>
  );
});

LatestFgTable.displayName = 'LatestFgTable';
