-- ============================================================================
-- SQL Script Name: hourlyHeatmap.sql
-- Module: Production Intelligence
-- Purpose: Computes 2D Line vs Hour output density heat matrix.
--
-- Input Parameters:
--   @plantCode VARCHAR(10) - Optional Plant Code
--
-- Expected Output:
--   hourSlot   INT         - Hour of day (0-23)
--   lineCode   VARCHAR(20) - Assembly Line Code
--   outputCount INT         - Production volume count
-- ============================================================================

SELECT
  DATEPART(HOUR, ISNULL([CreatedOn], GETDATE())) AS hourSlot,
  ISNULL([LineCode], 'LINE-01') AS lineCode,
  COUNT(1) AS outputCount
FROM SAP_ZPP_SEQ_PLAN
WHERE 1=1
  AND (@plantCode IS NULL OR [PlantCode] = @plantCode)
GROUP BY DATEPART(HOUR, ISNULL([CreatedOn], GETDATE())), [LineCode]
ORDER BY hourSlot ASC, [LineCode] ASC;
