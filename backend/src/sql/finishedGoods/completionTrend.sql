-- ============================================================================
-- SQL Script Name: completionTrend.sql
-- Module: Finished Goods Intelligence
-- Purpose: Aggregates hourly vehicle completion counts.
--
-- Input Parameters:
--   @plantCode VARCHAR(10) - Optional Plant Code
--
-- Expected Output:
--   timeWindow   VARCHAR(10) - Hourly window
--   receiptCount INT         - Completed vehicle receipts
-- ============================================================================

SELECT
  CONVERT(VARCHAR(2), [RowInsertTime], 108) + ':00' AS timeWindow,
  COUNT(1) AS receiptCount
FROM SAP_FG
WHERE 1=1
  AND (@plantCode IS NULL OR [PlantCode] = @plantCode)
  AND CAST([RowInsertTime] AS DATE) = CAST(GETDATE() AS DATE)
GROUP BY CONVERT(VARCHAR(2), [RowInsertTime], 108)
ORDER BY timeWindow ASC;
