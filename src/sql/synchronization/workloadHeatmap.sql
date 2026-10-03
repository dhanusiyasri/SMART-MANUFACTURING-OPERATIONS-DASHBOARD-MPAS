-- ============================================================================
-- SQL Script Name: workloadHeatmap.sql
-- Module: Synchronization Intelligence
-- Purpose: Aggregates 2D API Interface vs Hour processing volume matrix.
--
-- Input Parameters: None
--
-- Expected Output:
--   hourSlot    INT          - Hour of day (0-23)
--   apiName     VARCHAR(100) - Target Interface Name
--   volumeCount BIGINT       - Processed Volume
-- ============================================================================

SELECT
  DATEPART(HOUR, ISNULL([recordInsertDateTime], GETDATE())) AS hourSlot,
  ISNULL([apiName], 'SAP_ZPP_SEQ_PLAN') AS apiName,
  SUM(ISNULL([numberOfRecords], 1000)) AS volumeCount
FROM SAP_DATA_FOUND_LOG WITH (NOLOCK)
WHERE CAST([recordInsertDateTime] AS DATE) = CAST(GETDATE() AS DATE)
GROUP BY DATEPART(HOUR, ISNULL([recordInsertDateTime], GETDATE())), [apiName]
ORDER BY hourSlot ASC, apiName ASC;
