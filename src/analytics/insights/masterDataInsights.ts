import { IAnalyticsInsightDTO } from '../dto/analyticsResponse.dto.js';

export interface IMasterDataInsightInput {
  qrCoverageRate: number;
  newMaterialsCount: number;
  activeBomRulesCount: number;
}

/**
 * Generates rule-based master data insights for SAP_CHILD_MASTER & SAP_CBN_MASTER.
 * Deterministic business rules only.
 */
export function generateMasterDataInsights(input: IMasterDataInsightInput): IAnalyticsInsightDTO[] {
  const insights: IAnalyticsInsightDTO[] = [];

  // Rule 1: QR Mandate Coverage
  if (input.qrCoverageRate >= 98.0) {
    insights.push({
      id: 'md-ins-1',
      title: 'QR Mandate Coverage Improved',
      description: `Child part barcode mapping coverage reached ${input.qrCoverageRate.toFixed(1)}% across active SKUs.`,
      recommendation: 'Maintain automated daily Master Data sync job.',
      severity: 'OPTIMIZATION'
    });
  } else {
    insights.push({
      id: 'md-ins-1',
      title: 'Unmapped Child Material Barcodes Flagged',
      description: `QR coverage rate is currently ${input.qrCoverageRate.toFixed(1)}%.`,
      recommendation: 'Upload missing component cross-reference entries in SAP_CHILD_MASTER.',
      severity: 'WARNING'
    });
  }

  // Rule 2: New Materials Synchronized
  if (input.newMaterialsCount > 0) {
    insights.push({
      id: 'md-ins-2',
      title: 'New Materials Synchronized',
      description: `${input.newMaterialsCount} new SAP Material Master records synchronized into MPAS_DB today.`,
      recommendation: 'Verify BOM Explosion rules for newly added material codes.',
      severity: 'INFO'
    });
  }

  // Rule 3: Active BOM Rules Summary
  insights.push({
    id: 'md-ins-3',
    title: 'BOM Rule Set Active',
    description: `${input.activeBomRulesCount.toLocaleString()} BOM dependency rules active across vehicle platforms.`,
    recommendation: 'Perform routine quarterly BOM archive clean-up.',
    severity: 'INFO'
  });

  return insights;
}
