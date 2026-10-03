-- ============================================================================
-- SQL Script Name: productionTrend.sql
-- Module: Production Intelligence
-- Purpose: Aggregates hourly sequence output velocity by assembly line.
--
-- Input Parameters:
--   @plantCode VARCHAR(10) - Optional Plant Code
--
-- Expected Output:
--   lineCode    VARCHAR(20) - Assembly Line Code
--   timeWindow  VARCHAR(10) - Hourly window (e.g. '06:00', '08:00')
--   outputCount INT         - Number of sequence orders
-- ============================================================================

SELECT
  ISNULL([LineCode], 'LINE-01') AS lineCode,
  CONVERT(VARCHAR(2), [CreatedOn], 108) + ':00' AS timeWindow,
  COUNT(1) AS outputCount
FROM SAP_ZPP_SEQ_PLAN
WHERE 1=1
  AND (@plantCode IS NULL OR [PlantCode] = @plantCode)
  AND CAST([CreatedOn] AS DATE) = CAST(GETDATE() AS DATE)
GROUP BY [LineCode], CONVERT(VARCHAR(2), [CreatedOn], 108)
ORDER BY timeWindow ASC, [LineCode] ASC;
