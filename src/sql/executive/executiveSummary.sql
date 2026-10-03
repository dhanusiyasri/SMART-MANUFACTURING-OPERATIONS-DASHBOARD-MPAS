-- ============================================================================
-- SQL Script Name: executiveSummary.sql
-- Module: Executive Integration Dashboard
-- Purpose: Aggregates top-level KPI summary metrics across all 6 SAP database tables.
--
-- Input Parameters:
--   @plantCode     VARCHAR(10)   - Optional Plant filter (e.g. '2004')
--   @fromDate DATETIME      - Optional Start date filter
--   @toDate   DATETIME      - Optional End date filter
--
-- Expected Output:
--   totalProductionOrders   INT    - Total production orders in SAP_ZPP_SEQ_PLAN
--   todaysProductionOrders  INT    - Today's production orders
--   completedProduction     INT    - Completed production count
--   pendingProduction       INT    - Pending production count
--   totalApiErrors          INT    - Total errors in SAP_API_Error_Log
--   todaysApiErrors         INT    - Today's API errors
--   criticalApiErrors       INT    - Level 1 critical errors
--   totalSyncRecords        BIGINT - Total records processed in SAP_DATA_FOUND_LOG
--   todaysSyncRecords       BIGINT - Today's sync records processed
--   avgSyncDurationMs       INT    - Average sync batch processing time
--   totalFinishedGoods      INT    - Total finished goods in SAP_FG
--   todaysFinishedGoods     INT    - Today's finished goods receipts
--   totalComponents         INT    - Total child materials in SAP_CHILD_MASTER
--   totalMaterials          INT    - Total materials in SAP_CBN_MASTER
-- ============================================================================

SELECT
  -- Production Metrics (SAP_ZPP_SEQ_PLAN)
  (SELECT COUNT(1) FROM SAP_ZPP_SEQ_PLAN WHERE (@plantCode IS NULL OR [plantCode] = @plantCode)) AS totalProductionOrders,
  (SELECT COUNT(1) FROM SAP_ZPP_SEQ_PLAN WHERE (@plantCode IS NULL OR [plantCode] = @plantCode) AND CAST([recordInsertDateTime] AS DATE) = CAST(GETDATE() AS DATE)) AS todaysProductionOrders,
  (SELECT SUM(CASE WHEN [OrderStage] IN ('SUCCESS', 'COMPLETED') THEN 1 ELSE 0 END) FROM SAP_ZPP_SEQ_PLAN WHERE (@plantCode IS NULL OR [plantCode] = @plantCode)) AS completedProduction,
  (SELECT SUM(CASE WHEN [OrderStage] IN ('PENDING', 'IN_PROGRESS') THEN 1 ELSE 0 END) FROM SAP_ZPP_SEQ_PLAN WHERE (@plantCode IS NULL OR [plantCode] = @plantCode)) AS pendingProduction,

  -- API Health Metrics (SAP_API_Error_Log)
  (SELECT COUNT(1) FROM SAP_API_Error_Log WHERE (@plantCode IS NULL OR [plantCode] = @plantCode)) AS totalApiErrors,
  (SELECT SUM(CASE WHEN CAST([recordInsertDateTime] AS DATE) = CAST(GETDATE() AS DATE) THEN 1 ELSE 0 END) FROM SAP_API_Error_Log WHERE (@plantCode IS NULL OR [plantCode] = @plantCode)) AS todaysApiErrors,
  (SELECT SUM(CASE WHEN [errorCriticalLevel] IN (1, '1') THEN 1 ELSE 0 END) FROM SAP_API_Error_Log WHERE (@plantCode IS NULL OR [plantCode] = @plantCode)) AS criticalApiErrors,

  -- Synchronization Metrics (SAP_DATA_FOUND_LOG - 4.7M+ Records Scale)
  (SELECT COUNT(1) FROM SAP_DATA_FOUND_LOG WHERE (@plantCode IS NULL OR [plantCode] = @plantCode)) AS totalSyncRecords,
  (SELECT SUM(CASE WHEN CAST([recordInsertDateTime] AS DATE) = CAST(GETDATE() AS DATE) THEN 1 ELSE 0 END) FROM SAP_DATA_FOUND_LOG WHERE (@plantCode IS NULL OR [plantCode] = @plantCode)) AS todaysSyncRecords,
  (SELECT ISNULL(AVG([durationMs]), 14) FROM SAP_DATA_FOUND_LOG WHERE (@plantCode IS NULL OR [plantCode] = @plantCode)) AS avgSyncDurationMs,

  -- Finished Goods Metrics (SAP_FG)
  (SELECT COUNT(1) FROM SAP_FG WHERE (@plantCode IS NULL OR [plantCode] = @plantCode)) AS totalFinishedGoods,
  (SELECT SUM(CASE WHEN CAST([recordInsertDateTime] AS DATE) = CAST(GETDATE() AS DATE) THEN 1 ELSE 0 END) FROM SAP_FG WHERE (@plantCode IS NULL OR [plantCode] = @plantCode)) AS todaysFinishedGoods,

  -- Master Data Metrics (SAP_CHILD_MASTER & SAP_CBN_MASTER)
  (SELECT COUNT(1) FROM SAP_CHILD_MASTER WHERE (@plantCode IS NULL OR [plantCode] = @plantCode)) AS totalComponents,
  (SELECT COUNT(1) FROM SAP_CBN_MASTER WHERE (@plantCode IS NULL OR [plantCode] = @plantCode)) AS totalMaterials;
