import React, { memo } from 'react';
import { useDrilldown } from '../../../../contexts/DrilldownContext.js';
import { Button } from '../../../../components/common/Button.js';
import { HiOutlineChevronRight, HiOutlineRefresh } from '../../../../icons/index.js';

export const DrilldownBreadcrumb: React.FC = memo(() => {
  const { breadcrumb, drillTo, back, reset, isDrilled, history } = useDrilldown();

  if (!isDrilled && breadcrumb.length <= 1) {
    return null; // Top-level view, omit breadcrumb bar
  }

  return (
    <div className="bg-brand-50/80 border border-brand-200/80 rounded-xl p-2.5 px-3 flex flex-wrap items-center justify-between gap-2 text-xs shadow-2xs">
      {/* Breadcrumb Steps Stream */}
      <div className="flex items-center flex-wrap space-x-1.5 font-mono font-semibold">
        <span className="text-3xs uppercase tracking-wider text-brand-700 font-bold mr-1">
          Active Drilldown:
        </span>
        {breadcrumb.map((item, idx) => (
          <React.Fragment key={`${item.level}-${item.value}`}>
            {idx > 0 && <HiOutlineChevronRight className="w-3.5 h-3.5 text-brand-400 shrink-0" />}
            <button
              onClick={() => drillTo(item.level, item.value)}
              className={`px-2 py-0.5 rounded-md transition-colors ${
                item.isActive
                  ? 'bg-brand-600 text-white font-extrabold shadow-2xs'
                  : 'bg-white text-slate-700 hover:bg-brand-100 hover:text-brand-800 border border-slate-200'
              }`}
            >
              <span className="text-3xs text-slate-400 uppercase mr-1 font-sans">{item.label}:</span>
              <span>{item.value}</span>
            </button>
          </React.Fragment>
        ))}
      </div>

      {/* Action Controls: Step Back & One-Click Reset (Part 8) */}
      <div className="flex items-center space-x-2 shrink-0">
        {history.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={back}
            className="text-3xs h-7 py-0 px-2.5"
          >
            ← Back
          </Button>
        )}
        <Button
          variant="outline"
          size="sm"
          onClick={reset}
          icon={<HiOutlineRefresh className="w-3.5 h-3.5" />}
          className="text-3xs h-7 py-0 px-2.5 text-red-700 border-red-200 hover:bg-red-50"
        >
          Reset Drill Filter
        </Button>
      </div>
    </div>
  );
});

DrilldownBreadcrumb.displayName = 'DrilldownBreadcrumb';
