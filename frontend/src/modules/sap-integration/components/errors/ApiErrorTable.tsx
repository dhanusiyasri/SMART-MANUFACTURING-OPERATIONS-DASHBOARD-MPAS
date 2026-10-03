import React, { memo } from 'react';
import { IApiErrorLog, ApiErrorPagination } from '../../types/apiErrorLog.type.js';
import { ApiErrorRow } from './ApiErrorRow.js';
import {
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlineExclamationCircle,
  HiOutlineCheckCircle
} from '../../../../icons/index.js';

interface ApiErrorTableProps {
  errors: IApiErrorLog[];
  loading: boolean;
  error: Error | null;
  pagination: ApiErrorPagination;
  selectedErrorIds: Set<string>;
  onToggleSelectRow: (id: string) => void;
  onSelectAllRows: (selectAll: boolean) => void;
  onSelectError: (err: IApiErrorLog) => void;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
}

export const ApiErrorTable: React.FC<ApiErrorTableProps> = memo(({
  errors,
  loading,
  error,
  pagination,
  selectedErrorIds,
  onToggleSelectRow,
  onSelectAllRows,
  onSelectError,
  onPageChange,
  onLimitChange
}) => {
  const isAllSelected = errors.length > 0 && selectedErrorIds.size === errors.length;

  const handleExportCsv = () => {
    if (!errors || errors.length === 0) {
      alert('No API Error Log records available to export.');
      return;
    }
    const headers = ['Timestamp', 'API Name', 'Plant', 'Line', 'Reference ID', 'Error Code', 'Error Message', 'Critical Level', 'Status'];
    const rows = errors.map((e) => [
      `"${e.timestamp}"`,
      `"${e.apiName}"`,
      `"${e.plantCode}"`,
      `"${e.assemblyLineCode}"`,
      `"${e.referenceId}"`,
      `"${e.errorCode}"`,
      `"${e.errorMessage.replace(/"/g, '""')}"`,
      `"${e.criticalLevel}"`,
      `"${e.status}"`
    ].join(','));
    
    const csvContent = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `SAP_API_Error_Logs_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportExcel = () => {
    if (!errors || errors.length === 0) {
      alert('No API Error Log records available to export.');
      return;
    }
    // Generates TSV content with UTF-8 Byte Order Mark (BOM) for native Microsoft Excel opening
    const headers = ['Timestamp', 'API Name', 'Plant', 'Line', 'Reference ID', 'Error Code', 'Error Message', 'Critical Level', 'Status'];
    const rows = errors.map((e) => [
      `"${e.timestamp}"`,
      `"${e.apiName}"`,
      `"${e.plantCode}"`,
      `"${e.assemblyLineCode}"`,
      `"${e.referenceId}"`,
      `"${e.errorCode}"`,
      `"${e.errorMessage.replace(/"/g, '""')}"`,
      `"${e.criticalLevel}"`,
      `"${e.status}"`
    ].join('\t'));
    
    const excelContent = '\uFEFF' + [headers.join('\t'), ...rows].join('\n');
    const blob = new Blob([excelContent], { type: 'application/vnd.ms-excel;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `SAP_API_Error_Logs_${new Date().toISOString().slice(0, 10)}.xls`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    if (!errors || errors.length === 0) {
      alert('No API Error Log records available to print.');
      return;
    }

    const printWindow = window.open('', '_blank', 'width=1000,height=700');
    if (!printWindow) {
      alert('Popup blocker prevented opening the print window. Please allow popups.');
      return;
    }

    const rowsHtml = errors.map((e) => `
      <tr>
        <td style="padding:6px 8px; border:1px solid #cbd5e1; font-family:monospace; font-size:11px; white-space:nowrap;">${e.timestamp}</td>
        <td style="padding:6px 8px; border:1px solid #cbd5e1; font-family:monospace; font-weight:bold; font-size:11px; white-space:nowrap;">${e.apiName}</td>
        <td style="padding:6px 8px; border:1px solid #cbd5e1; font-size:11px; white-space:nowrap;">${e.plantCode}</td>
        <td style="padding:6px 8px; border:1px solid #cbd5e1; font-size:11px; white-space:nowrap;">${e.assemblyLineCode}</td>
        <td style="padding:6px 8px; border:1px solid #cbd5e1; font-family:monospace; font-weight:bold; color:#1d4ed8; font-size:11px; white-space:nowrap;">${e.referenceId}</td>
        <td style="padding:6px 8px; border:1px solid #cbd5e1; font-family:monospace; color:#b91c1c; font-weight:bold; font-size:11px; white-space:nowrap;">${e.errorCode}</td>
        <td style="padding:6px 8px; border:1px solid #cbd5e1; font-size:11px;">${e.errorMessage}</td>
        <td style="padding:6px 8px; border:1px solid #cbd5e1; font-size:11px; white-space:nowrap;">${e.criticalLevel}</td>
        <td style="padding:6px 8px; border:1px solid #cbd5e1; font-size:11px; white-space:nowrap;">${e.status}</td>
      </tr>
    `).join('');

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Ashok Leyland - SAP API Error Log Report</title>
          <style>
            body { font-family: system-ui, -apple-system, sans-serif; margin: 20px; color: #0f172a; }
            .header { border-bottom: 2px solid #0284c7; padding-bottom: 8px; margin-bottom: 16px; }
            h1 { font-size: 16px; font-weight: 800; margin: 0; color: #0f172a; }
            .sub { font-size: 11px; color: #64748b; margin-top: 4px; }
            table { width: 100%; border-collapse: collapse; text-align: left; }
            th { background-color: #f1f5f9; padding: 8px; border: 1px solid #cbd5e1; font-size: 10px; font-weight: 800; text-transform: uppercase; color: #475569; }
            @page { size: landscape; margin: 10mm; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Ashok Leyland Smart Manufacturing Operations (MPAS)</h1>
            <div class="sub">SAP API Error Log Executive Report | Plant Code: 2004 | Generated: ${new Date().toLocaleString()}</div>
          </div>
          <table>
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>API Name</th>
                <th>Plant</th>
                <th>Line</th>
                <th>Reference ID</th>
                <th>Error Code</th>
                <th>Error Message</th>
                <th>Critical Level</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${rowsHtml}
            </tbody>
          </table>
          <script>
            window.onload = function() {
              window.print();
              window.close();
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div id="printable-api-error-grid" className="bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden flex flex-col">
      {/* Action Header Bar */}
      <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center space-x-2">
          <span className="font-bold text-slate-800">SAP API Error Data Grid</span>
          {selectedErrorIds.size > 0 && (
            <span className="bg-brand-50 text-brand-700 font-semibold px-2.5 py-0.5 rounded-full border border-brand-200">
              {selectedErrorIds.size} Selected
            </span>
          )}
        </div>

        {/* Export Action Buttons */}
        <div className="flex items-center space-x-2">
          <button
            onClick={handleExportCsv}
            type="button"
            className="px-2.5 py-1 bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300 rounded-md font-medium transition-colors cursor-pointer"
            title="Download CSV export"
          >
            Export CSV
          </button>
          <button
            onClick={handleExportExcel}
            type="button"
            className="px-2.5 py-1 bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300 rounded-md font-medium transition-colors cursor-pointer"
            title="Download Excel XLS sheet"
          >
            Export Excel
          </button>
          <button
            onClick={handlePrint}
            type="button"
            className="px-2.5 py-1 bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300 rounded-md font-medium transition-colors cursor-pointer"
            title="Print Error Data Grid Report"
          >
            Print
          </button>
        </div>
      </div>

      {/* Grid Table Container */}
      <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
        <table className="w-full text-left border-collapse" aria-label="SAP API Error Grid">
          {/* Sticky Header */}
          <thead className="bg-slate-100/90 sticky top-0 z-10 border-b border-slate-200 shadow-2xs text-3xs font-extrabold text-slate-500 uppercase tracking-wider">
            <tr>
              <th className="px-3 py-3 text-center w-10">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={(e) => onSelectAllRows(e.target.checked)}
                  className="rounded border-slate-300 text-brand-600 focus:ring-brand-500 cursor-pointer"
                  aria-label="Select all errors"
                />
              </th>
              <th className="px-4 py-3">Timestamp</th>
              <th className="px-4 py-3">API Name</th>
              <th className="px-4 py-3">Plant</th>
              <th className="px-4 py-3">Line</th>
              <th className="px-4 py-3">Reference ID</th>
              <th className="px-4 py-3">Error Code</th>
              <th className="px-4 py-3">Error Message</th>
              <th className="px-4 py-3">Critical Level</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-slate-100 text-xs">
            {loading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <tr key={index} className="animate-pulse">
                  <td className="p-3 text-center"><div className="w-4 h-4 bg-slate-200 rounded mx-auto" /></td>
                  <td className="p-3"><div className="w-24 h-4 bg-slate-200 rounded" /></td>
                  <td className="p-3"><div className="w-28 h-4 bg-slate-200 rounded" /></td>
                  <td className="p-3"><div className="w-12 h-4 bg-slate-200 rounded" /></td>
                  <td className="p-3"><div className="w-12 h-4 bg-slate-200 rounded" /></td>
                  <td className="p-3"><div className="w-20 h-4 bg-slate-200 rounded" /></td>
                  <td className="p-3"><div className="w-16 h-4 bg-slate-200 rounded" /></td>
                  <td className="p-3"><div className="w-36 h-4 bg-slate-200 rounded" /></td>
                  <td className="p-3"><div className="w-20 h-4 bg-slate-200 rounded" /></td>
                  <td className="p-3"><div className="w-16 h-4 bg-slate-200 rounded" /></td>
                  <td className="p-3 text-right"><div className="w-12 h-4 bg-slate-200 rounded ml-auto" /></td>
                </tr>
              ))
            ) : error ? (
              <tr>
                <td colSpan={11} className="py-12 text-center bg-red-50/50 text-red-700">
                  <HiOutlineExclamationCircle className="w-8 h-8 mx-auto mb-2 text-red-500" />
                  <p className="font-bold">Error Loading SAP API Error Logs</p>
                  <p className="text-xs text-red-600 mt-1">{error.message}</p>
                </td>
              </tr>
            ) : errors.length === 0 ? (
              <tr>
                <td colSpan={11} className="py-12 text-center text-slate-500">
                  <HiOutlineCheckCircle className="w-10 h-10 mx-auto mb-2 text-slate-300" />
                  <p className="font-semibold text-slate-700">No API Error Logs Found</p>
                  <p className="text-xs text-slate-400 mt-1">Adjust filters or verify SAP_API_ERROR_LOG database table connection.</p>
                </td>
              </tr>
            ) : (
              errors.map((errLog) => (
                <ApiErrorRow
                  key={errLog.id}
                  errorLog={errLog}
                  isSelected={selectedErrorIds.has(errLog.id)}
                  onToggleSelect={onToggleSelectRow}
                  onSelectError={onSelectError}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="px-4 py-3 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
        <div>
          Showing page <span className="font-bold text-slate-900">{pagination.page}</span> of{' '}
          <span className="font-bold text-slate-900">{pagination.totalPages}</span> ({pagination.totalRecords.toLocaleString()} records total)
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1.5">
            <span className="text-3xs text-slate-500 font-medium">Rows per page:</span>
            <select
              value={pagination.limit}
              onChange={(e) => onLimitChange(Number(e.target.value))}
              className="bg-white border border-slate-200 rounded px-2 py-1 text-xs font-semibold focus:outline-hidden"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>

          <div className="flex items-center space-x-1">
            <button
              onClick={() => onPageChange(pagination.page - 1)}
              disabled={pagination.page <= 1}
              className="p-1 bg-white border border-slate-200 rounded text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed"
              title="Previous Page"
            >
              <HiOutlineChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-2 font-semibold">{pagination.page}</span>
            <button
              onClick={() => onPageChange(pagination.page + 1)}
              disabled={pagination.page >= pagination.totalPages}
              className="p-1 bg-white border border-slate-200 rounded text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed"
              title="Next Page"
            >
              <HiOutlineChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

ApiErrorTable.displayName = 'ApiErrorTable';
