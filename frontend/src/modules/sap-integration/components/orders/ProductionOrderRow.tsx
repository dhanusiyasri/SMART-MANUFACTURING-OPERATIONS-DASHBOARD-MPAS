import React, { memo, useState } from 'react';
import { ISAPOrder } from '../../types/sapOrder.type.js';
import { StatusBadge } from './StatusBadge.js';
import { formatSapTimestamp } from '../../utils/sapFormatters.js';
import { HiOutlineEye, HiOutlineClipboard, HiOutlineCheck } from '../../../../icons/index.js';

interface ProductionOrderRowProps {
  order: ISAPOrder;
  isSelected: boolean;
  onToggleSelect: (id: string) => void;
  onSelectOrder: (order: ISAPOrder) => void;
}

export const ProductionOrderRow: React.FC<ProductionOrderRowProps> = memo(({
  order,
  isSelected,
  onToggleSelect,
  onSelectOrder
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopyPlnum = (e: React.MouseEvent) => {
    e.stopPropagation();
    void navigator.clipboard.writeText(order.plnum);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <tr
      onClick={() => onSelectOrder(order)}
      className={`border-b border-slate-200/80 transition-colors cursor-pointer hover:bg-slate-50/80 ${
        isSelected ? 'bg-brand-50/40 font-medium' : ''
      }`}
    >
      {/* Checkbox Multi-selection */}
      <td className="px-3 py-3 text-center" onClick={(e) => e.stopPropagation()}>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onToggleSelect(order.id)}
          className="rounded border-slate-300 text-brand-600 focus:ring-brand-500 cursor-pointer"
          aria-label={`Select order ${order.plnum}`}
        />
      </td>

      {/* Order Number (PLNUM) */}
      <td className="px-4 py-3 text-xs font-mono font-bold text-brand-700 whitespace-nowrap">
        {order.plnum}
      </td>

      {/* Material Code & Description */}
      <td className="px-4 py-3 text-xs max-w-xs truncate">
        <div className="font-mono font-bold text-slate-900">{order.materialCode}</div>
        <div className="text-3xs text-slate-500 truncate">{order.materialDescription}</div>
      </td>

      {/* VIN / Serial Number */}
      <td className="px-4 py-3 text-xs font-mono font-bold text-slate-800 whitespace-nowrap">
        {order.vinNumber}
      </td>

      {/* Plant */}
      <td className="px-4 py-3 text-xs text-slate-700 whitespace-nowrap font-medium">
        {order.plantCode}
      </td>

      {/* Production Line */}
      <td className="px-4 py-3 text-xs text-slate-700 whitespace-nowrap font-medium">
        {order.assemblyLineCode}
      </td>

      {/* Production Date */}
      <td className="px-4 py-3 text-xs text-slate-700 whitespace-nowrap">
        {order.productionDate}
      </td>

      {/* Production Time */}
      <td className="px-4 py-3 text-xs text-slate-700 whitespace-nowrap">
        {order.productionTime}
      </td>

      {/* SAP Status */}
      <td className="px-4 py-3 text-xs whitespace-nowrap">
        <StatusBadge status={order.status} />
      </td>

      {/* Created Time */}
      <td className="px-4 py-3 text-xs text-slate-500 whitespace-nowrap">
        {formatSapTimestamp(order.createdAt)}
      </td>

      {/* Actions Column */}
      <td className="px-4 py-3 text-xs whitespace-nowrap text-right" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-end space-x-1">
          {/* Copy PLNUM Button */}
          <button
            type="button"
            onClick={handleCopyPlnum}
            className="p-1 text-slate-400 hover:text-brand-600 hover:bg-slate-100 rounded-md transition-colors"
            title="Copy Order Number (PLNUM)"
            aria-label="Copy Order Number"
          >
            {copied ? <HiOutlineCheck className="w-4 h-4 text-emerald-600" /> : <HiOutlineClipboard className="w-4 h-4" />}
          </button>

          {/* View Details Drawer Button */}
          <button
            type="button"
            onClick={() => onSelectOrder(order)}
            className="p-1 text-slate-400 hover:text-brand-600 hover:bg-slate-100 rounded-md transition-colors"
            title="View Order Details"
            aria-label="View Order Details"
          >
            <HiOutlineEye className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
});

ProductionOrderRow.displayName = 'ProductionOrderRow';
