import React, { memo, useMemo } from 'react';
import { AnalyticsCard } from '../AnalyticsCard.js';

export interface TopMaterialRow {
  materialCode: string;
  materialDescription: string;
  ordersCount: number;
  plantCode: string;
  lineCode: string;
  lineRank?: number;
  productionShare?: number;
  trendStatus?: string;
}

interface TopMaterialsTableProps {
  materials: TopMaterialRow[];
  loading?: boolean;
  error?: Error | null;
  selectedLine?: string;
  onRowClick?: (material: TopMaterialRow) => void;
}

const OFFICIAL_LINE_CONFIGS: Record<string, { dbName: string; cardTitle: string; badgeBg: string; borderColor: string }> = {
  '0101': {
    dbName: 'LINE 1 CHASSIS',
    cardTitle: 'Production Line 0101 (LINE 1 CHASSIS)',
    badgeBg: 'bg-blue-50 text-blue-800 border-blue-200',
    borderColor: 'border-blue-100'
  },
  '0201': {
    dbName: 'LINE 2 CHASSIS',
    cardTitle: 'Production Line 0201 (LINE 2 CHASSIS)',
    badgeBg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    borderColor: 'border-emerald-100'
  },
  '0203': {
    dbName: 'REAR AXLE LINE',
    cardTitle: 'Production Line 0203 (REAR AXLE LINE)',
    badgeBg: 'bg-amber-50 text-amber-800 border-amber-200',
    borderColor: 'border-amber-100'
  }
};

export const TopMaterialsTable: React.FC<TopMaterialsTableProps> = memo(({
  materials,
  loading = false,
  error = null,
  selectedLine,
  onRowClick
}) => {
  // Determine visible lines adaptively based on filtered data and selectedLine prop
  const visibleLines = useMemo(() => {
    if (selectedLine && selectedLine !== 'ALL' && ['0101', '0201', '0203'].includes(selectedLine)) {
      return [selectedLine];
    }
    const dataLines = Array.from(new Set(materials.map((m) => m.lineCode))).filter((l) => ['0101', '0201', '0203'].includes(l));
    if (dataLines.length === 1) {
      return dataLines;
    }
    return ['0101', '0201', '0203'];
  }, [materials, selectedLine]);

  const isSingleLineView = visibleLines.length === 1;
  const singleLineCode = isSingleLineView ? visibleLines[0] : null;
  const singleConfig = singleLineCode ? OFFICIAL_LINE_CONFIGS[singleLineCode] : null;

  const cardTitle = isSingleLineView && singleConfig
    ? `8. Top Materials – Production Line ${singleLineCode} (${singleConfig.dbName})`
    : '8. Top Materials by Production Line';

  const cardSubtitle = isSingleLineView && singleLineCode
    ? `Business Question: Which materials contribute most to Production Line ${singleLineCode}?`
    : 'Business Question: Which materials lead production volume independently across all production lines?';

  return (
    <AnalyticsCard
      title={cardTitle}
      subtitle={cardSubtitle}
      tooltipText="Independent Top 5 manufactured materials partitioned by Production Line using SQL ROW_NUMBER() ranking."
      loading={loading}
      error={error}
    >
      <div className={`grid gap-4 ${isSingleLineView ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'}`}>
        {visibleLines.map((line) => {
          const config = OFFICIAL_LINE_CONFIGS[line] || {
            dbName: `Production Line ${line}`,
            cardTitle: `Production Line ${line}`,
            badgeBg: 'bg-slate-100 text-slate-800 border-slate-200',
            borderColor: 'border-slate-200'
          };

          const lineMaterials = materials
            .filter((m) => m.lineCode === line)
            .slice(0, 5);

          return (
            <div
              key={line}
              className={`flex flex-col bg-white rounded-lg border ${config.borderColor} shadow-2xs overflow-hidden`}
            >
              {/* Section Header */}
              <div className={`px-3.5 py-2.5 border-b flex items-center justify-between ${config.badgeBg}`}>
                <div>
                  <span className="text-xs font-extrabold tracking-tight block">
                    {config.cardTitle}
                  </span>
                </div>
                <span className="text-3xs font-bold uppercase px-2 py-0.5 rounded bg-white/90 text-slate-700 shadow-2xs">
                  Top 5 SKUs
                </span>
              </div>

              {/* Table Body */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse" aria-label={`Top Materials for ${config.cardTitle}`}>
                  <thead className="bg-slate-50 text-3xs font-extrabold text-slate-500 uppercase tracking-wider border-b border-slate-100">
                    <tr>
                      <th className="px-3 py-2 text-center w-8">#</th>
                      <th className="px-3 py-2">Material SKU</th>
                      <th className="px-3 py-2 text-right">Orders</th>
                      <th className="px-3 py-2 text-right">Line Share</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    {lineMaterials.length > 0 ? (
                      lineMaterials.map((m, idx) => {
                        const rank = m.lineRank || idx + 1;
                        return (
                          <tr
                            key={`${line}-${m.materialCode}`}
                            onClick={() => onRowClick && onRowClick(m)}
                            className={`hover:bg-slate-50 transition-colors ${onRowClick ? 'cursor-pointer' : ''}`}
                          >
                            <td className="px-3 py-2.5 text-center whitespace-nowrap">
                              <span className={`inline-flex items-center justify-center w-4 h-4 rounded-full text-3xs font-extrabold ${
                                rank === 1 ? 'bg-amber-500 text-white' : rank === 2 ? 'bg-slate-400 text-white' : rank === 3 ? 'bg-amber-700 text-white' : 'bg-slate-100 text-slate-600'
                              }`}>
                                {rank}
                              </span>
                            </td>
                            <td className="px-3 py-2.5">
                              <div className="font-mono font-bold text-slate-900 text-2xs truncate" title={m.materialCode}>
                                {m.materialCode}
                              </div>
                              <div className="text-3xs text-slate-500 font-medium truncate max-w-xs" title={m.materialDescription}>
                                {m.materialDescription}
                              </div>
                            </td>
                            <td className="px-3 py-2.5 text-right font-extrabold text-slate-900 whitespace-nowrap">
                              {m.ordersCount.toLocaleString()}
                            </td>
                            <td className="px-3 py-2.5 text-right font-semibold text-brand-700 whitespace-nowrap text-3xs">
                              {m.productionShare ? `${m.productionShare}%` : 'N/A'}
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={4} className="px-3 py-4 text-center text-slate-400 text-xs italic">
                          No order data available for Line {line}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
      </div>
    </AnalyticsCard>
  );
});

TopMaterialsTable.displayName = 'TopMaterialsTable';
