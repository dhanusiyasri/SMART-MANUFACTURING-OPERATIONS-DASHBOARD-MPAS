-- ============================================================================
-- SQL Script Name: plantComparison.sql
-- Module: Production Intelligence
-- Purpose: Ranks and compares production sequence order volume across plants.
--
-- Input Parameters: None
--
-- Expected Output:
--   plantCode   VARCHAR(10) - Plant Code (e.g. '2004', '2005', '2001')
--   plantName   VARCHAR(50) - Formatted Plant Name
--   orderCount  INT         - Total Sequence Orders
-- ============================================================================

SELECT TOP 5
  ISNULL([PlantCode], '2004') AS plantCode,
  'Plant ' + ISNULL([PlantCode], '2004') AS plantName,
  COUNT(1) AS orderCount
FROM SAP_ZPP_SEQ_PLAN
GROUP BY [PlantCode]
ORDER BY orderCount DESC;
