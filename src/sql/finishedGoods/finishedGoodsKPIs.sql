-- ============================================================================
-- SQL Script Name: finishedGoodsKPIs.sql
-- Module: Finished Goods Intelligence
-- Purpose: Aggregates finished goods receipt KPI summary metrics from SAP_FG.
--
-- Input Parameters:
--   @plantCode VARCHAR(10) - Optional Plant Code
--
-- Expected Output:
--   totalFinishedGoods  INT - Cumulative FG Receipts
--   todaysFinishedGoods INT - Today's Receipts
--   completionRate      DECIMAL(5,2) - Success Completion Rate
-- ============================================================================

SELECT
  COUNT(1) AS totalFinishedGoods,
  SUM(CASE WHEN CAST([RowInsertTime] AS DATE) = CAST(GETDATE() AS DATE) THEN 1 ELSE 0 END) AS todaysFinishedGoods,
  CAST(
    (SUM(CASE WHEN [OrderStage] IN ('MPAS_OK', 'SUCCESS', 'DISPATCH_READY') THEN 1 ELSE 0 END) * 100.0) /
    NULLIF(COUNT(1), 0) AS DECIMAL(5,2)
  ) AS completionRate
FROM SAP_FG
WHERE 1=1
  AND (@plantCode IS NULL OR [PlantCode] = @plantCode);
