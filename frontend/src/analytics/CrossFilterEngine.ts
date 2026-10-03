/**
 * Enterprise CrossFilterEngine
 * Manages event publishing, subscription, and drill level resolution across all ECharts visuals and Data Grids.
 */

export type DrillLevel = 'PLANT' | 'LINE' | 'MATERIAL' | 'ORDER' | 'SERIAL';

export interface IDrillState {
  currentLevel: DrillLevel;
  selectedPlant: string;
  selectedLine: string;
  selectedMaterial: string;
  selectedOrder: string;
  selectedSerial: string;
}

export interface ICrossFilterEvent {
  level: DrillLevel;
  value: string;
  sourceVisualId?: string;
  metadata?: Record<string, unknown>;
}

export type CrossFilterSubscriber = (event: ICrossFilterEvent, state: IDrillState) => void;

export class CrossFilterEngine {
  private static instance: CrossFilterEngine;
  private subscribers: Set<CrossFilterSubscriber> = new Set();
  private historyStack: IDrillState[] = [];

  private currentState: IDrillState = {
    currentLevel: 'PLANT',
    selectedPlant: '2004',
    selectedLine: '',
    selectedMaterial: '',
    selectedOrder: '',
    selectedSerial: ''
  };

  private constructor() {}

  public static getInstance(): CrossFilterEngine {
    if (!CrossFilterEngine.instance) {
      CrossFilterEngine.instance = new CrossFilterEngine();
    }
    return CrossFilterEngine.instance;
  }

  public getState(): IDrillState {
    return { ...this.currentState };
  }

  public getHistory(): IDrillState[] {
    return [...this.historyStack];
  }

  public subscribe(subscriber: CrossFilterSubscriber): () => void {
    this.subscribers.add(subscriber);
    return () => {
      this.subscribers.delete(subscriber);
    };
  }

  public publish(event: ICrossFilterEvent): IDrillState {
    // Push current state onto history stack for back navigation
    this.historyStack.push({ ...this.currentState });

    const nextState: IDrillState = { ...this.currentState };

    switch (event.level) {
      case 'PLANT':
        nextState.currentLevel = 'PLANT';
        nextState.selectedPlant = event.value || '2004';
        nextState.selectedLine = '';
        nextState.selectedMaterial = '';
        nextState.selectedOrder = '';
        nextState.selectedSerial = '';
        break;

      case 'LINE':
        nextState.currentLevel = 'LINE';
        nextState.selectedLine = event.value;
        nextState.selectedMaterial = '';
        nextState.selectedOrder = '';
        nextState.selectedSerial = '';
        break;

      case 'MATERIAL':
        nextState.currentLevel = 'MATERIAL';
        nextState.selectedMaterial = event.value;
        nextState.selectedOrder = '';
        nextState.selectedSerial = '';
        break;

      case 'ORDER':
        nextState.currentLevel = 'ORDER';
        nextState.selectedOrder = event.value;
        nextState.selectedSerial = '';
        break;

      case 'SERIAL':
        nextState.currentLevel = 'SERIAL';
        nextState.selectedSerial = event.value;
        break;
    }

    this.currentState = nextState;
    this.notifySubscribers(event);
    return this.currentState;
  }

  public back(): IDrillState | null {
    if (this.historyStack.length === 0) {
      return null;
    }
    const previousState = this.historyStack.pop();
    if (previousState) {
      this.currentState = previousState;
      const navEvent: ICrossFilterEvent = {
        level: previousState.currentLevel,
        value: this.getValueForLevel(previousState, previousState.currentLevel),
        sourceVisualId: 'SYSTEM_BACK'
      };
      this.notifySubscribers(navEvent);
      return this.currentState;
    }
    return null;
  }

  public reset(defaultPlant = '2004'): IDrillState {
    this.historyStack = [];
    this.currentState = {
      currentLevel: 'PLANT',
      selectedPlant: defaultPlant,
      selectedLine: '',
      selectedMaterial: '',
      selectedOrder: '',
      selectedSerial: ''
    };
    const resetEvent: ICrossFilterEvent = {
      level: 'PLANT',
      value: defaultPlant,
      sourceVisualId: 'SYSTEM_RESET'
    };
    this.notifySubscribers(resetEvent);
    return this.currentState;
  }

  private getValueForLevel(state: IDrillState, level: DrillLevel): string {
    switch (level) {
      case 'PLANT':
        return state.selectedPlant;
      case 'LINE':
        return state.selectedLine;
      case 'MATERIAL':
        return state.selectedMaterial;
      case 'ORDER':
        return state.selectedOrder;
      case 'SERIAL':
        return state.selectedSerial;
    }
  }

  private notifySubscribers(event: ICrossFilterEvent): void {
    const state = this.getState();
    this.subscribers.forEach((sub) => {
      try {
        sub(event, state);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('❌ Error in CrossFilterSubscriber:', err);
      }
    });
  }
}

export const crossFilterEngine = CrossFilterEngine.getInstance();
