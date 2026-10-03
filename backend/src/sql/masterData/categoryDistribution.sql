-- ============================================================================
-- SQL Script Name: categoryDistribution.sql
-- Module: Master Data Intelligence
-- Purpose: Aggregates Material Master entries by Material Type / Category.
--
-- Input Parameters: None
--
-- Expected Output:
--   categoryName VARCHAR(40) - Material Category (FERT, HALB, ROH)
--   skusCount    INT          - Total SKUs
-- ============================================================================

SELECT
  ISNULL([MaterialCode], 'FERT') AS categoryName,
  COUNT(1) AS skusCount
FROM SAP_CBN_MASTER
GROUP BY [MaterialCode]
ORDER BY skusCount DESC;
