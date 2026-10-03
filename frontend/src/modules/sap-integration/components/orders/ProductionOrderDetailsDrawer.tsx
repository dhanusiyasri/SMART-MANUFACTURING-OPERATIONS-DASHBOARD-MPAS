import React, { useEffect } from 'react';
import { ISAPOrder } from '../../types/sapOrder.type.js';
import { StatusBadge } from './StatusBadge.js';
import { formatSapTimestamp } from '../../utils/sapFormatters.js';
import { HiOutlineX, HiOutlineClipboardCheck, HiOutlineClock, HiOutlineDocumentText } from '../../../../icons/index.js';

interface ProductionOrderDetailsDrawerProps {
  order: ISAPOrder | null;
  onClose: () => void;
}

export const ProductionOrderDetailsDrawer: React.FC<ProductionOrderDetailsDrawerProps> = ({
  order,
  onClose
}) => {
  // Close drawer on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!order) return null;

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
                <span className="text-3xs font-extrabold text-slate-500 uppercase tracking-widest">
                  Order Details
                </span>
                <StatusBadge status={order.status} />
              </div>
              <h2 className="text-lg font-extrabold text-slate-900 tracking-tight mt-1">
                {order.plnum}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
              aria-label="Close Order Details Drawer"
            >
              <HiOutlineX className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Section 1: Core Order & Material Info */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center">
                <HiOutlineDocumentText className="w-4 h-4 mr-1.5 text-brand-600" />
                Material & Order Information
              </h3>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-3xs text-slate-500 block">Material Code</span>
                  <span className="font-mono font-bold text-slate-900">{order.materialCode}</span>
                </div>
                <div>
                  <span className="text-3xs text-slate-500 block">Sequence Number</span>
                  <span className="font-bold text-slate-900"># {order.sequenceNumber}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-3xs text-slate-500 block">Material Description</span>
                  <span className="font-medium text-slate-800">{order.materialDescription}</span>
                </div>
              </div>
            </div>

            {/* Section 2: VIN & Manufacturing Location */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center">
                <HiOutlineClipboardCheck className="w-4 h-4 mr-1.5 text-emerald-600" />
                Traceability & Plant Location
              </h3>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-3xs text-slate-500 block">VIN / Serial Number</span>
                  <span className="font-mono font-bold text-emerald-700">{order.vinNumber}</span>
                </div>
                <div>
                  <span className="text-3xs text-slate-500 block">Plant Code</span>
                  <span className="font-bold text-slate-900">{order.plantCode}</span>
                </div>
                <div>
                  <span className="text-3xs text-slate-500 block">Assembly Line</span>
                  <span className="font-bold text-slate-900">{order.assemblyLineCode}</span>
                </div>
                <div>
                  <span className="text-3xs text-slate-500 block">ERP Sync Status</span>
                  <span className="font-semibold text-slate-700">
                    {order.isSyncedWithERP ? 'Synced to SAP ERP' : 'Pending Sync'}
                  </span>
                </div>
              </div>
            </div>

            {/* Section 3: Shift Production Timestamps */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center">
                <HiOutlineClock className="w-4 h-4 mr-1.5 text-amber-600" />
                Production Timestamps
              </h3>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-3xs text-slate-500 block">Production Date</span>
                  <span className="font-medium text-slate-900">{order.productionDate}</span>
                </div>
                <div>
                  <span className="text-3xs text-slate-500 block">Production Time</span>
                  <span className="font-medium text-slate-900">{order.productionTime}</span>
                </div>
                <div>
                  <span className="text-3xs text-slate-500 block">Created Timestamp</span>
                  <span className="font-medium text-slate-700">{formatSapTimestamp(order.createdAt)}</span>
                </div>
                <div>
                  <span className="text-3xs text-slate-500 block">Updated Timestamp</span>
                  <span className="font-medium text-slate-700">{formatSapTimestamp(order.updatedAt)}</span>
                </div>
              </div>
            </div>

            {/* Section 4: Future Lifecycle Timeline Placeholder */}
            <div className="border border-dashed border-slate-300 rounded-xl p-4 bg-white">
              <h4 className="text-xs font-bold text-slate-800 mb-2">Order Execution Timeline (Placeholder)</h4>
              <div className="space-y-2 text-xs text-slate-500">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Order Created & Received from SAP ERP</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Sequenced for Line Assignment</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span>Assembly Line Processing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
