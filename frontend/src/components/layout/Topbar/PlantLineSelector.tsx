import React from 'react';
import { usePlantContext } from '../../../hooks/usePlantContext.js';
import { HiOutlineDatabase, HiOutlineChip } from '../../../icons/index.js';

export const PlantLineSelector: React.FC = () => {
  const { plants, lines, selectedPlant, selectedLine, setSelectedPlant, setSelectedLine } = usePlantContext();

  return (
    <div className="hidden lg:flex items-center space-x-2 bg-slate-100/80 border border-slate-200 rounded-lg p-1">
      {/* Plant Selector */}
      <div className="flex items-center space-x-1 px-2 py-1 bg-white rounded-md shadow-2xs border border-slate-200">
        <HiOutlineDatabase className="w-3.5 h-3.5 text-brand-600 shrink-0" />
        <select
          value={selectedPlant.id}
          onChange={(e) => {
            const found = plants.find((p) => p.id === e.target.value);
            if (found) setSelectedPlant(found);
          }}
          className="bg-transparent text-xs font-bold text-slate-800 focus:outline-hidden cursor-pointer"
          aria-label="Select Manufacturing Plant"
        >
          {plants.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name} ({p.code})
            </option>
          ))}
        </select>
      </div>

      {/* Assembly Line Selector */}
      <div className="flex items-center space-x-1 px-2 py-1 bg-white rounded-md shadow-2xs border border-slate-200">
        <HiOutlineChip className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
        <select
          value={selectedLine.id}
          onChange={(e) => {
            const found = lines.find((l) => l.id === e.target.value);
            if (found) setSelectedLine(found);
          }}
          className="bg-transparent text-xs font-semibold text-slate-700 focus:outline-hidden cursor-pointer"
          aria-label="Select Assembly Line"
        >
          {lines.map((l) => (
            <option key={l.id} value={l.id}>
              {l.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
