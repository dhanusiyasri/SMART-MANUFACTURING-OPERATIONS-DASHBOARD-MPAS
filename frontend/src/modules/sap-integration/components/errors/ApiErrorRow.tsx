import React, { memo, useState } from 'react';
import { IApiErrorLog } from '../../types/apiErrorLog.type.js';
import { CriticalLevelBadge } from './CriticalLevelBadge.js';
import { ErrorStatusBadge } from './ErrorStatusBadge.js';
import { formatSapTimestamp } from '../../utils/sapFormatters.js';
import { HiOutlineEye, HiOutlineClipboard, HiOutlineCheck, HiOutlineRefresh } from '../../../../icons/index.js';

interface ApiErrorRowProps {
  errorLog: IApiErrorLog;
  isSelected: boolean;
  onToggleSelect: (id: string) => void;
  onSelectError: (err: IApiErrorLog) => void;
}

export const ApiErrorRow: React.FC<ApiErrorRowProps> = memo(({
  errorLog,
  isSelected,
  onToggleSelect,
  onSelectError
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopyRefId = (e: React.MouseEvent) => {
    e.stopPropagation();
    void navigator.clipboard.writeText(errorLog.referenceId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReplayPlaceholder = (e: React.MouseEvent) => {
    e.stopPropagation();
    alert(`Replay API Placeholder: Re-submitting transaction ${errorLog.referenceId} to SAP ERP.`);
  };

  return (
    <tr
      onClick={() => onSelectError(errorLog)}
      className={`border-b border-slate-200/80 transition-colors cursor-pointer hover:bg-slate-50/80 ${
        isSelected ? 'bg-brand-50/40 font-medium' : ''
      }`}
    >
      {/* Checkbox Multi-selection */}
      <td className="px-3 py-3 text-center" onClick={(e) => e.stopPropagation()}>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onToggleSelect(errorLog.id)}
          className="rounded border-slate-300 text-brand-600 focus:ring-brand-500 cursor-pointer"
          aria-label={`Select error ${errorLog.referenceId}`}
        />
      </td>

      {/* Timestamp */}
      <td className="px-4 py-3 text-xs text-slate-600 whitespace-nowrap font-medium">
        {formatSapTimestamp(errorLog.timestamp)}
      </td>

      {/* API Name */}
      <td className="px-4 py-3 text-xs font-mono font-bold text-slate-900 whitespace-nowrap">
        {errorLog.apiName}
      </td>

      {/* Plant */}
      <td className="px-4 py-3 text-xs text-slate-700 whitespace-nowrap">
        {errorLog.plantCode}
      </td>

      {/* Production Line */}
      <td className="px-4 py-3 text-xs text-slate-700 whitespace-nowrap">
        {errorLog.assemblyLineCode}
      </td>

      {/* Reference ID */}
      <td className="px-4 py-3 text-xs font-mono font-bold text-brand-700 whitespace-nowrap">
        {errorLog.referenceId}
      </td>

      {/* Error Code */}
      <td className="px-4 py-3 text-xs font-mono font-semibold text-red-700 whitespace-nowrap">
        {errorLog.errorCode}
      </td>

      {/* Error Message */}
      <td className="px-4 py-3 text-xs max-w-xs truncate text-slate-800" title={errorLog.errorMessage}>
        {errorLog.errorMessage}
      </td>

      {/* Critical Level */}
      <td className="px-4 py-3 text-xs whitespace-nowrap">
        <CriticalLevelBadge level={errorLog.criticalLevel} />
      </td>

      {/* Status */}
      <td className="px-4 py-3 text-xs whitespace-nowrap">
        <ErrorStatusBadge status={errorLog.status} />
      </td>

      {/* Actions */}
      <td className="px-4 py-3 text-xs whitespace-nowrap text-right" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-end space-x-1">
          {/* Copy Reference ID */}
          <button
            type="button"
            onClick={handleCopyRefId}
            className="p-1 text-slate-400 hover:text-brand-600 hover:bg-slate-100 rounded-md transition-colors"
            title="Copy Reference ID"
            aria-label="Copy Reference ID"
          >
            {copied ? <HiOutlineCheck className="w-4 h-4 text-emerald-600" /> : <HiOutlineClipboard className="w-4 h-4" />}
          </button>

          {/* Replay API Placeholder */}
          <button
            type="button"
            onClick={handleReplayPlaceholder}
            className="p-1 text-slate-400 hover:text-amber-600 hover:bg-slate-100 rounded-md transition-colors"
            title="Replay API Transaction"
            aria-label="Replay API"
          >
            <HiOutlineRefresh className="w-4 h-4" />
          </button>

          {/* View Details Drawer Button */}
          <button
            type="button"
            onClick={() => onSelectError(errorLog)}
            className="p-1 text-slate-400 hover:text-brand-600 hover:bg-slate-100 rounded-md transition-colors"
            title="View Error Details"
            aria-label="View Error Details"
          >
            <HiOutlineEye className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
});

ApiErrorRow.displayName = 'ApiErrorRow';
