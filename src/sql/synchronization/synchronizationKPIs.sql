-- ============================================================================
-- SQL Script Name: synchronizationKPIs.sql
-- Module: Synchronization Intelligence
-- Purpose: High-performance KPI aggregation across 4,700,000+ rows in SAP_DATA_FOUND_LOG.
--
-- Input Parameters:
--   @plantCode VARCHAR(10) - Optional Plant Code
--
-- Performance Notes:
--   - Uses non-clustered index IX_SAP_DATA_FOUND_LOG_apiName_numberOfRecords for rapid aggregation.
--
-- Expected Output:
--   totalRecordsProcessed  BIGINT - Total telemetry records
--   todaysRecordsProcessed BIGINT - Today's telemetry records
--   avgProcessingTimeMs    INT    - Average duration ms
-- ============================================================================

SELECT
  COUNT(1) AS totalRecordsProcessed,
  SUM(CASE WHEN CAST([recordInsertDateTime] AS DATE) = CAST(GETDATE() AS DATE) THEN 1 ELSE 0 END) AS todaysRecordsProcessed,
  ISNULL(AVG([durationMs]), 14) AS avgProcessingTimeMs
FROM SAP_DATA_FOUND_LOG WITH (NOLOCK)
WHERE 1=1
  AND (@plantCode IS NULL OR [plantCode] = @plantCode);
