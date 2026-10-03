import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { PlantLocation, ProductionLine } from '../types/index.js';

export interface IPlantContext {
  plants: PlantLocation[];
  lines: ProductionLine[];
  selectedPlant: PlantLocation;
  selectedLine: ProductionLine;
  setSelectedPlant: (plant: PlantLocation) => void;
  setSelectedLine: (line: ProductionLine) => void;
}

export const AVAILABLE_PLANTS: PlantLocation[] = [
  { id: '2004', name: 'Plant 2004', code: '2004' }
];

export const AVAILABLE_LINES: Record<string, ProductionLine[]> = {
  '2004': [
    { id: '0101', name: 'Line 0101', plantId: '2004', code: '0101' },
    { id: '0201', name: 'Line 0201', plantId: '2004', code: '0201' },
    { id: '0203', name: 'Line 0203', plantId: '2004', code: '0203' }
  ]
};

export const PlantContext = createContext<IPlantContext | undefined>(undefined);

export const PlantProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedPlant, setSelectedPlantState] = useState<PlantLocation>(AVAILABLE_PLANTS[0]);

  const availableLinesForPlant = AVAILABLE_LINES['2004'];

  const [selectedLine, setSelectedLineState] = useState<ProductionLine>(() => {
    const savedLineId = localStorage.getItem('mpas_selected_line_id');
    const found = availableLinesForPlant.find((l) => l.code === savedLineId || l.id === savedLineId);
    return found || availableLinesForPlant[0];
  });

  const setSelectedPlant = (plant: PlantLocation) => {
    setSelectedPlantState(plant);
    localStorage.setItem('mpas_selected_plant_id', plant.id);
  };

  const setSelectedLine = (line: ProductionLine) => {
    setSelectedLineState(line);
    localStorage.setItem('mpas_selected_line_id', line.id);
  };

  useEffect(() => {
    localStorage.setItem('mpas_selected_plant_id', selectedPlant.id);
    localStorage.setItem('mpas_selected_line_id', selectedLine.id);
  }, [selectedPlant, selectedLine]);

  return (
    <PlantContext.Provider
      value={{
        plants: AVAILABLE_PLANTS,
        lines: availableLinesForPlant,
        selectedPlant,
        selectedLine,
        setSelectedPlant,
        setSelectedLine
      }}
    >
      {children}
    </PlantContext.Provider>
  );
};
