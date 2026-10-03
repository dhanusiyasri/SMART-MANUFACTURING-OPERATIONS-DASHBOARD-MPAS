-- ============================================================================
-- SQL Script Name: supplierDistribution.sql
-- Module: Master Data Intelligence
-- Purpose: Aggregates child component master records grouped by Supplier / Plant.
--
-- Input Parameters:
--   @plantCode VARCHAR(10) - Optional Plant Code
--
-- Expected Output:
--   supplierCode VARCHAR(20) - Vendor / Supplier Code
--   componentCount INT       - Total child part entries
-- ============================================================================

SELECT TOP 10
  ISNULL([Supplier], 'VENDOR-AL-101') AS supplierCode,
  COUNT(1) AS componentCount
FROM SAP_CHILD_MASTER
WHERE 1=1
  AND (@plantCode IS NULL OR [PlantCode] = @plantCode)
GROUP BY [Supplier]
ORDER BY componentCount DESC;
