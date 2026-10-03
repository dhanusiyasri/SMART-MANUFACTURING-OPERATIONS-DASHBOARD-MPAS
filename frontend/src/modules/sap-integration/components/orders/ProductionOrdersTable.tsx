import React, { memo } from 'react';
import { ISAPOrder, ProductionOrderPagination } from '../../types/sapOrder.type.js';
import { ProductionOrderRow } from './ProductionOrderRow.js';
import {
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlineExclamationCircle,
  HiOutlineCheckCircle
} from '../../../../icons/index.js';

interface ProductionOrdersTableProps {
  orders: ISAPOrder[];
  loading: boolean;
  error: Error | null;
  pagination: ProductionOrderPagination;
  selectedOrderIds: Set<string>;
  onToggleSelectRow: (id: string) => void;
  onSelectAllRows: (selectAll: boolean) => void;
  onSelectOrder: (order: ISAPOrder) => void;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
}

export const ProductionOrdersTable: React.FC<ProductionOrdersTableProps> = memo(({
  orders,
  loading,
  error,
  pagination,
  selectedOrderIds,
  onToggleSelectRow,
  onSelectAllRows,
  onSelectOrder,
  onPageChange,
  onLimitChange
}) => {
  const isAllSelected = orders.length > 0 && selectedOrderIds.size === orders.length;

  const handleExportCsv = () => {
    alert('CSV Export Triggered: Generates CSV export for SAP_ZPP_SEQ_PLAN data.');
  };

  const handleExportExcel = () => {
    alert('Excel Export Triggered: Generates XLSX export for active SAP orders.');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden flex flex-col">
      {/* Table Action Bar */}
      <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center space-x-2">
          <span className="font-bold text-slate-800">Production Orders</span>
          {selectedOrderIds.size > 0 && (
            <span className="bg-brand-50 text-brand-700 font-semibold px-2.5 py-0.5 rounded-full border border-brand-200">
              {selectedOrderIds.size} Selected
            </span>
          )}
        </div>

        {/* Export Triggers */}
        <div className="flex items-center space-x-2">
          <button
            onClick={handleExportCsv}
            className="px-2.5 py-1 bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 rounded-md font-medium transition-colors"
          >
            Export CSV
          </button>
          <button
            onClick={handleExportExcel}
            className="px-2.5 py-1 bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 rounded-md font-medium transition-colors"
          >
            Export Excel
          </button>
          <button
            onClick={handlePrint}
            className="px-2.5 py-1 bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 rounded-md font-medium transition-colors"
          >
            Print
          </button>
        </div>
      </div>

      {/* Grid Table Wrapper */}
      <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
        <table className="w-full text-left border-collapse" aria-label="Production Orders Grid">
          {/* Sticky Header */}
          <thead className="bg-slate-100/90 sticky top-0 z-10 border-b border-slate-200 shadow-2xs text-3xs font-extrabold text-slate-500 uppercase tracking-wider">
            <tr>
              <th className="px-3 py-3 text-center w-10">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={(e) => onSelectAllRows(e.target.checked)}
                  className="rounded border-slate-300 text-brand-600 focus:ring-brand-500 cursor-pointer"
                  aria-label="Select all orders"
                />
              </th>
              <th className="px-4 py-3">Order # (PLNUM)</th>
              <th className="px-4 py-3">Material Code</th>
              <th className="px-4 py-3">VIN / Serial #</th>
              <th className="px-4 py-3">Plant</th>
              <th className="px-4 py-3">Line</th>
              <th className="px-4 py-3">Prod Date</th>
              <th className="px-4 py-3">Prod Time</th>
              <th className="px-4 py-3">SAP Status</th>
              <th className="px-4 py-3">Created</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-slate-100 text-xs">
            {loading ? (
              // Loading Skeleton State
              Array.from({ length: 5 }).map((_, index) => (
                <tr key={index} className="animate-pulse">
                  <td className="p-3 text-center"><div className="w-4 h-4 bg-slate-200 rounded mx-auto" /></td>
                  <td className="p-3"><div className="w-20 h-4 bg-slate-200 rounded" /></td>
                  <td className="p-3"><div className="w-32 h-4 bg-slate-200 rounded" /></td>
                  <td className="p-3"><div className="w-24 h-4 bg-slate-200 rounded" /></td>
                  <td className="p-3"><div className="w-12 h-4 bg-slate-200 rounded" /></td>
                  <td className="p-3"><div className="w-16 h-4 bg-slate-200 rounded" /></td>
                  <td className="p-3"><div className="w-16 h-4 bg-slate-200 rounded" /></td>
                  <td className="p-3"><div className="w-12 h-4 bg-slate-200 rounded" /></td>
                  <td className="p-3"><div className="w-16 h-4 bg-slate-200 rounded" /></td>
                  <td className="p-3"><div className="w-24 h-4 bg-slate-200 rounded" /></td>
                  <td className="p-3 text-right"><div className="w-12 h-4 bg-slate-200 rounded ml-auto" /></td>
                </tr>
              ))
            ) : error ? (
              // Error Fallback State
              <tr>
                <td colSpan={11} className="py-12 text-center bg-red-50/50 text-red-700">
                  <HiOutlineExclamationCircle className="w-8 h-8 mx-auto mb-2 text-red-500" />
                  <p className="font-bold">Error Loading SAP Production Orders</p>
                  <p className="text-xs text-red-600 mt-1">{error.message}</p>
                </td>
              </tr>
            ) : orders.length === 0 ? (
              // Empty State
              <tr>
                <td colSpan={11} className="py-12 text-center text-slate-500">
                  <HiOutlineCheckCircle className="w-10 h-10 mx-auto mb-2 text-slate-300" />
                  <p className="font-semibold text-slate-700">No Production Orders Found</p>
                  <p className="text-xs text-slate-400 mt-1">Adjust filters or verify SAP_ZPP_SEQ_PLAN database table sync.</p>
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <ProductionOrderRow
                  key={order.id}
                  order={order}
                  isSelected={selectedOrderIds.has(order.id)}
                  onToggleSelect={onToggleSelectRow}
                  onSelectOrder={onSelectOrder}
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
          <span className="font-bold text-slate-900">{pagination.totalPages}</span> ({pagination.totalRecords} records total)
        </div>

        <div className="flex items-center space-x-3">
          {/* Rows Per Page Select */}
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

          {/* Page Buttons */}
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

ProductionOrdersTable.displayName = 'ProductionOrdersTable';
