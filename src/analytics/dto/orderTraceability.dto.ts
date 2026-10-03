export interface IOrderTraceabilityStep {
  stepId: string;
  stepName: string;
  timestamp: string;
  status: 'SUCCESS' | 'PENDING' | 'FAILED';
  systemName: string;
  details: string;
}

export interface IOrderTraceabilityResponseDTO {
  orderNumber: string;
  vinNumber: string;
  materialCode: string;
  plantCode: string;
  lineCode: string;
  orderStatus: string;
  createdOn: string;
  traceabilitySteps: IOrderTraceabilityStep[];
}
