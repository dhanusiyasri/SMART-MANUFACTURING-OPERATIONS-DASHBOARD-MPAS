-- ============================================================================
-- SQL Script Name: stageDistribution.sql
-- Module: Finished Goods Intelligence
-- Purpose: Aggregates finished goods volume grouped by production / QC stage.
--
-- Input Parameters:
--   @plantCode VARCHAR(10) - Optional Plant Code
--
-- Expected Output:
--   stageName VARCHAR(40) - Stage Name (e.g. 'MPAS_OK', 'QC_PENDING', 'DISPATCHED')
--   count     INT         - Vehicle count
-- ============================================================================

SELECT
  ISNULL([OrderStage], 'MPAS_OK') AS stageName,
  COUNT(1) AS count
FROM SAP_FG
WHERE 1=1
  AND (@plantCode IS NULL OR [PlantCode] = @plantCode)
GROUP BY [OrderStage]
ORDER BY count DESC;
