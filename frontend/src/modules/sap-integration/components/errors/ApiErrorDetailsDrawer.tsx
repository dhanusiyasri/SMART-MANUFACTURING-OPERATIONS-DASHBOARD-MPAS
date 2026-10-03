import React, { useEffect } from 'react';
import { IApiErrorLog } from '../../types/apiErrorLog.type.js';
import { CriticalLevelBadge } from './CriticalLevelBadge.js';
import { ErrorStatusBadge } from './ErrorStatusBadge.js';
import { formatSapTimestamp } from '../../utils/sapFormatters.js';
import { HiOutlineX, HiOutlineExclamationCircle, HiOutlineRefresh, HiOutlineCode } from '../../../../icons/index.js';

interface ApiErrorDetailsDrawerProps {
  errorLog: IApiErrorLog | null;
  onClose: () => void;
}

export const ApiErrorDetailsDrawer: React.FC<ApiErrorDetailsDrawerProps> = ({
  errorLog,
  onClose
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!errorLog) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200" aria-modal="true" role="dialog">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-xs" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-lg bg-white shadow-2xl border-l border-slate-200 flex flex-col">
          {/* Header */}
          <div className="p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <CriticalLevelBadge level={errorLog.criticalLevel} />
                <ErrorStatusBadge status={errorLog.status} />
              </div>
              <h2 className="text-sm font-extrabold text-slate-900 tracking-tight mt-1.5 font-mono">
                {errorLog.referenceId}
              </h2>
              <span className="text-xs text-slate-500 font-medium">{errorLog.apiName}</span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
              aria-label="Close Error Details Drawer"
            >
              <HiOutlineX className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Section 1: Error Overview */}
            <div className="bg-red-50/60 border border-red-200 rounded-xl p-4 space-y-2">
              <h3 className="text-xs font-bold text-red-900 uppercase tracking-wider flex items-center">
                <HiOutlineExclamationCircle className="w-4 h-4 mr-1.5 text-red-600" />
                Error Exception Details
              </h3>
              <div className="text-xs font-bold text-red-700 font-mono">
                [{errorLog.errorCode}] {errorLog.errorMessage}
              </div>
            </div>

            {/* Section 2: Technical Identifiers & Location */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center">
                <HiOutlineCode className="w-4 h-4 mr-1.5 text-brand-600" />
                Technical Metadata
              </h3>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-3xs text-slate-500 block">Plant Location</span>
                  <span className="font-bold text-slate-900">{errorLog.plantCode}</span>
                </div>
                <div>
                  <span className="text-3xs text-slate-500 block">Assembly Line</span>
                  <span className="font-bold text-slate-900">{errorLog.assemblyLineCode}</span>
                </div>
                <div>
                  <span className="text-3xs text-slate-500 block">Criticality Level</span>
                  <span className="font-mono font-bold text-slate-800">
                    Level {errorLog.criticalLevel === 'LEVEL_1' ? '1 (Critical)' : errorLog.criticalLevel === 'LEVEL_2' ? '2 (High)' : '3 (Medium)'}
                  </span>
                </div>
                <div>
                  <span className="text-3xs text-slate-500 block">Log Timestamp</span>
                  <span className="font-medium text-slate-800">{formatSapTimestamp(errorLog.timestamp)}</span>
                </div>
              </div>
            </div>

            {/* Section 3: Stack Trace / Detailed Error Description */}
            <div className="space-y-1.5">
              <span className="text-3xs font-bold text-slate-500 uppercase tracking-wider block">
                Detailed Stack Trace / Payload
              </span>
              <pre className="p-3 bg-slate-900 text-emerald-400 text-3xs font-mono rounded-lg overflow-x-auto max-h-48 leading-relaxed">
                {errorLog.detailedDescription || `[STACK TRACE - ${errorLog.errorCode}]\nAt SAP_API_ERROR_LOG table entry ${errorLog.id}\nTarget: ${errorLog.apiName}\nPayload: {"referenceId": "${errorLog.referenceId}", "plant": "${errorLog.plantCode}"}\nReason: ${errorLog.errorMessage}`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
