-- ============================================================================
-- SQL Script Name: apiKPIs.sql
-- Module: API Exception & Health Intelligence
-- Purpose: Aggregates error KPIs from SAP_API_Error_Log.
--
-- Input Parameters:
--   @plantCode   VARCHAR(10)  - Optional Plant Code
--   @apiName VARCHAR(100) - Optional API Name
--
-- Expected Output:
--   totalErrors          INT - Cumulative API Errors
--   todaysErrors         INT - Errors logged today
--   criticalLevel1Count  INT - Level 1 Critical Errors
--   highLevel2Count      INT - Level 2 High Errors
--   mediumLevel3Count    INT - Level 3 Medium Errors
--   uniqueApisWithErrors INT - Count of distinct failing endpoints
-- ============================================================================

SELECT
  COUNT(1) AS totalErrors,
  SUM(CASE WHEN CAST([recordInsertDateTime] AS DATE) = CAST(GETDATE() AS DATE) THEN 1 ELSE 0 END) AS todaysErrors,
  SUM(CASE WHEN [errorCriticalLevel] IN (1, '1') THEN 1 ELSE 0 END) AS criticalLevel1Count,
  SUM(CASE WHEN [errorCriticalLevel] IN (2, '2') THEN 1 ELSE 0 END) AS highLevel2Count,
  SUM(CASE WHEN [errorCriticalLevel] IN (3, '3') THEN 1 ELSE 0 END) AS mediumLevel3Count,
  COUNT(DISTINCT [apiName]) AS uniqueApisWithErrors
FROM SAP_API_Error_Log
WHERE 1=1
  AND (@plantCode IS NULL OR [plantCode] = @plantCode)
  AND (@apiName IS NULL OR [apiName] = @apiName);
