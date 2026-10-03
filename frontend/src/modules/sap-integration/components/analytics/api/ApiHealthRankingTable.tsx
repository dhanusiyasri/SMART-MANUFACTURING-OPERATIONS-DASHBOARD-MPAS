import React, { memo } from 'react';
import { AnalyticsCard } from '../AnalyticsCard.js';

export interface ApiHealthRankingRow {
  apiName: string;
  successRate: number; // Percentage 0 - 100
  failuresCount: number;
  retriesCount: number;
  healthScore: number; // 0 - 100
  trendPercentage: number;
  isPositiveTrend: boolean;
}

interface ApiHealthRankingTableProps {
  rankings: ApiHealthRankingRow[];
  loading?: boolean;
  error?: Error | null;
  onRowClick?: (row: ApiHealthRankingRow) => void;
}

export const ApiHealthRankingTable: React.FC<ApiHealthRankingTableProps> = memo(({
  rankings,
  loading = false,
  error = null,
  onRowClick
}) => {
  return (
    <AnalyticsCard
      title="5. API Health & Reliability Ranking Table"
      subtitle='Question Answered: "Which APIs are healthiest?"'
      tooltipText="Ranks SAP integration endpoints by Health Score, Success %, and Retry ratio"
      loading={loading}
      error={error}
    >
      <div className="overflow-x-auto max-h-[250px] overflow-y-auto">
        <table className="w-full text-left text-xs border-collapse" aria-label="API Health Ranking Table">
          <thead className="bg-slate-100/90 sticky top-0 z-10 text-3xs font-extrabold text-slate-500 uppercase tracking-wider border-b border-slate-200">
            <tr>
              <th className="px-3 py-2">API Endpoint</th>
              <th className="px-3 py-2 text-right">Success %</th>
              <th className="px-3 py-2 text-right">Failures</th>
              <th className="px-3 py-2 text-right">Retries</th>
              <th className="px-3 py-2 text-right">Health Score</th>
              <th className="px-3 py-2 text-right">Trend</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {rankings.map((r) => (
              <tr
                key={r.apiName}
                onClick={() => onRowClick && onRowClick(r)}
                className={`hover:bg-slate-50 transition-colors ${onRowClick ? 'cursor-pointer' : ''}`}
              >
                <td className="px-3 py-2 font-mono font-bold text-slate-900 whitespace-nowrap">
                  {r.apiName}
                </td>
                <td className="px-3 py-2 text-right font-extrabold text-emerald-600 whitespace-nowrap">
                  {r.successRate}%
                </td>
                <td className="px-3 py-2 text-right font-bold text-red-600 whitespace-nowrap">
                  {r.failuresCount}
                </td>
                <td className="px-3 py-2 text-right text-slate-700 whitespace-nowrap">
                  {r.retriesCount}
                </td>
                <td className="px-3 py-2 text-right font-extrabold whitespace-nowrap">
                  <span
                    className={`px-2 py-0.5 rounded text-3xs font-black ${
                      r.healthScore >= 90
                        ? 'bg-emerald-100 text-emerald-800'
                        : r.healthScore >= 75
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {r.healthScore} / 100
                  </span>
                </td>
                <td className="px-3 py-2 text-right whitespace-nowrap">
                  <span
                    className={`inline-flex items-center text-3xs font-bold px-1.5 py-0.5 rounded ${
                      r.isPositiveTrend ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
                    }`}
                  >
                    {r.isPositiveTrend ? '▲' : '▼'} {r.trendPercentage}%
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

ApiHealthRankingTable.displayName = 'ApiHealthRankingTable';
