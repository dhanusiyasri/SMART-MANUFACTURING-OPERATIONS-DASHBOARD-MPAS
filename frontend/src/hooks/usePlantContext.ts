import { useContext } from 'react';
import { PlantContext, IPlantContext } from '../contexts/PlantContext.js';

export const usePlantContext = (): IPlantContext => {
  const context = useContext(PlantContext);
  if (!context) {
    throw new Error('usePlantContext must be used within a PlantProvider');
  }
  return context;
};
