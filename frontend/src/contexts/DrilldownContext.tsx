import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback, useMemo } from 'react';
import { crossFilterEngine, DrillLevel, IDrillState, ICrossFilterEvent } from '../analytics/CrossFilterEngine.js';

export interface IBreadcrumbItem {
  level: DrillLevel;
  label: string;
  value: string;
  isActive: boolean;
}

export interface IDrilldownContext {
  currentLevel: DrillLevel;
  selectedPlant: string;
  selectedLine: string;
  selectedMaterial: string;
  selectedOrder: string;
  selectedSerial: string;
  history: IDrillState[];
  breadcrumb: IBreadcrumbItem[];
  drillTo: (level: DrillLevel, value: string) => void;
  back: () => void;
  reset: () => void;
  isDrilled: boolean;
}

export const DrilldownContext = createContext<IDrilldownContext | undefined>(undefined);

// Helper to safely manipulate URL search parameters without requiring React Router context
const syncUrlWithState = (state: IDrillState) => {
  if (typeof window === 'undefined') return;
  try {
    const currentUrl = new URL(window.location.href);
    const params = currentUrl.searchParams;

    if (state.selectedPlant) params.set('plant', state.selectedPlant);
    else params.delete('plant');

    if (state.selectedLine) params.set('line', state.selectedLine);
    else params.delete('line');

    if (state.selectedMaterial) params.set('material', state.selectedMaterial);
    else params.delete('material');

    if (state.selectedOrder) params.set('order', state.selectedOrder);
    else params.delete('order');

    if (state.selectedSerial) params.set('serial', state.selectedSerial);
    else params.delete('serial');

    const newUrlStr = `${currentUrl.pathname}?${params.toString()}${currentUrl.hash}`;
    window.history.replaceState(null, '', newUrlStr);
  } catch (_e) {
    // Ignore URL update errors in non-browser environments
  }
};

export const DrilldownProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [drillState, setDrillState] = useState<IDrillState>(() => crossFilterEngine.getState());

  // PART 7: URL Synchronization - Initialize state from URL params on load safely
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const params = new URLSearchParams(window.location.search);
      const urlPlant = params.get('plant') || '2004';
      const urlLine = params.get('line') || params.get('lineCode') || '';
      const urlMaterial = params.get('material') || '';
      const urlOrder = params.get('order') || params.get('plnum') || '';
      const urlSerial = params.get('serial') || params.get('vin') || '';

      if (urlSerial) {
        crossFilterEngine.publish({ level: 'SERIAL', value: urlSerial });
      } else if (urlOrder) {
        crossFilterEngine.publish({ level: 'ORDER', value: urlOrder });
      } else if (urlMaterial) {
        crossFilterEngine.publish({ level: 'MATERIAL', value: urlMaterial });
      } else if (urlLine) {
        crossFilterEngine.publish({ level: 'LINE', value: urlLine });
      } else if (urlPlant) {
        crossFilterEngine.publish({ level: 'PLANT', value: urlPlant });
      }
    } catch (_e) {
      // Ignore URL parsing errors
    }
  }, []);

  // Subscribe to CrossFilterEngine updates
  useEffect(() => {
    const unsubscribe = crossFilterEngine.subscribe((_event: ICrossFilterEvent, newState: IDrillState) => {
      setDrillState(newState);
      syncUrlWithState(newState);
    });

    return () => unsubscribe();
  }, []);

  const drillTo = useCallback((level: DrillLevel, value: string) => {
    if (!value) return;
    crossFilterEngine.publish({ level, value });
  }, []);

  const back = useCallback(() => {
    crossFilterEngine.back();
  }, []);

  const reset = useCallback(() => {
    crossFilterEngine.reset();
  }, []);

  // PART 6: Breadcrumb Generation
  const breadcrumb = useMemo<IBreadcrumbItem[]>(() => {
    const items: IBreadcrumbItem[] = [
      {
        level: 'PLANT',
        label: 'Plant',
        value: drillState.selectedPlant || '2004',
        isActive: drillState.currentLevel === 'PLANT'
      }
    ];

    if (drillState.selectedLine) {
      items.push({
        level: 'LINE',
        label: 'Line',
        value: drillState.selectedLine,
        isActive: drillState.currentLevel === 'LINE'
      });
    }

    if (drillState.selectedMaterial) {
      items.push({
        level: 'MATERIAL',
        label: 'Material',
        value: drillState.selectedMaterial,
        isActive: drillState.currentLevel === 'MATERIAL'
      });
    }

    if (drillState.selectedOrder) {
      items.push({
        level: 'ORDER',
        label: 'Order',
        value: drillState.selectedOrder,
        isActive: drillState.currentLevel === 'ORDER'
      });
    }

    if (drillState.selectedSerial) {
      items.push({
        level: 'SERIAL',
        label: 'Serial',
        value: drillState.selectedSerial,
        isActive: drillState.currentLevel === 'SERIAL'
      });
    }

    return items;
  }, [drillState]);

  const isDrilled = drillState.currentLevel !== 'PLANT' || Boolean(drillState.selectedLine);

  return (
    <DrilldownContext.Provider
      value={{
        currentLevel: drillState.currentLevel,
        selectedPlant: drillState.selectedPlant,
        selectedLine: drillState.selectedLine,
        selectedMaterial: drillState.selectedMaterial,
        selectedOrder: drillState.selectedOrder,
        selectedSerial: drillState.selectedSerial,
        history: crossFilterEngine.getHistory(),
        breadcrumb,
        drillTo,
        back,
        reset,
        isDrilled
      }}
    >
      {children}
    </DrilldownContext.Provider>
  );
};

export const useDrilldown = (): IDrilldownContext => {
  const context = useContext(DrilldownContext);
  if (!context) {
    throw new Error('useDrilldown must be used within a DrilldownProvider');
  }
  return context;
};
