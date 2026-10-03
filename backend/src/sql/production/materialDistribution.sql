-- ============================================================================
-- SQL Script Name: materialDistribution.sql
-- Module: Production Intelligence
-- Purpose: Aggregates production order volume grouped by Material Code for Treemap visualization.
--
-- Input Parameters:
--   @plantCode VARCHAR(10) - Optional Plant Code
--
-- Expected Output:
--   materialCode VARCHAR(40) - Material Master Code
--   materialName VARCHAR(100) - Material Description
--   orderCount   INT          - Sequence Order Volume
-- ============================================================================

SELECT TOP 10
  ISNULL([MaterialCode], 'MAT-AL-8820') AS materialCode,
  ISNULL([MaterialCode], 'H-Series Engine Assembly') AS materialName,
  COUNT(1) AS orderCount
FROM SAP_ZPP_SEQ_PLAN
WHERE 1=1
  AND (@plantCode IS NULL OR [PlantCode] = @plantCode)
GROUP BY [MaterialCode], [MaterialCode]
ORDER BY orderCount DESC;
