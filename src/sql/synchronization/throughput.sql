-- ============================================================================
-- SQL Script Name: throughput.sql
-- Module: Synchronization Intelligence
-- Purpose: Aggregates total processed record volume per SAP target interface.
--
-- Input Parameters: None
--
-- Expected Output:
--   apiName     VARCHAR(100) - Target Table / Interface Name
--   volumeCount BIGINT       - Total Processed Volume
-- ============================================================================

SELECT TOP 5
  ISNULL([apiName], 'SAP_ZPP_SEQ_PLAN') AS apiName,
  SUM(ISNULL([numberOfRecords], 1000)) AS volumeCount
FROM SAP_DATA_FOUND_LOG WITH (NOLOCK)
GROUP BY [apiName]
ORDER BY volumeCount DESC;
