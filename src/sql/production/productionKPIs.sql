-- ============================================================================
-- SQL Script Name: productionKPIs.sql
-- Module: Production Intelligence
-- Purpose: Aggregates sequence planning KPI summary metrics from SAP_ZPP_SEQ_PLAN.
--
-- Input Parameters:
--   @plantCode     VARCHAR(10) - Optional Plant Code
--   @lineCode      VARCHAR(20) - Optional Line Code
--   @fromDate DATETIME    - Optional Start Date
--   @toDate   DATETIME    - Optional End Date
--
-- Expected Output:
--   totalOrders      INT - Total Sequence Production Orders
--   todaysOrders     INT - Today's Orders
--   completedOrders  INT - Completed / Success Orders
--   pendingOrders    INT - Pending / In Progress Orders
--   failedOrders     INT - Failed Orders
--   uniqueMaterials  INT - Distinct Material Codes
--   activeLines      INT - Distinct Active Lines
-- ============================================================================

SELECT
  COUNT(1) AS totalOrders,
  SUM(CASE WHEN CAST([CreatedOn] AS DATE) = CAST(GETDATE() AS DATE) THEN 1 ELSE 0 END) AS todaysOrders,
  SUM(CASE WHEN [SAPStatusCode] IN ('SUCCESS', 'COMPLETED') THEN 1 ELSE 0 END) AS completedOrders,
  SUM(CASE WHEN [SAPStatusCode] IN ('PENDING', 'IN_PROGRESS') THEN 1 ELSE 0 END) AS pendingOrders,
  SUM(CASE WHEN [SAPStatusCode] = 'FAILED' THEN 1 ELSE 0 END) AS failedOrders,
  COUNT(DISTINCT [MaterialCode]) AS uniqueMaterials,
  COUNT(DISTINCT [LineCode]) AS activeLines
FROM SAP_ZPP_SEQ_PLAN
WHERE 1=1
  AND (@plantCode IS NULL OR [PlantCode] = @plantCode)
  AND (@lineCode IS NULL OR [LineCode] = @lineCode)
  AND (@fromDate IS NULL OR [CreatedOn] >= @fromDate)
  AND (@toDate IS NULL OR [CreatedOn] <= @toDate);
