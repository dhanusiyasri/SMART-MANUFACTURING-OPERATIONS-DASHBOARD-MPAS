-- ============================================================================
-- SQL Script Name: lineComparison.sql
-- Module: Production Intelligence
-- Purpose: Compares throughput across active assembly lines.
--
-- Input Parameters:
--   @plantCode VARCHAR(10) - Optional Plant Code
--
-- Expected Output:
--   lineCode   VARCHAR(20) - Assembly Line Code
--   orderCount INT         - Total Sequence Orders
-- ============================================================================

SELECT TOP 10
  ISNULL([LineCode], 'LINE-01') AS lineCode,
  COUNT(1) AS orderCount
FROM SAP_ZPP_SEQ_PLAN
WHERE 1=1
  AND (@plantCode IS NULL OR [PlantCode] = @plantCode)
GROUP BY [LineCode]
ORDER BY orderCount DESC;
