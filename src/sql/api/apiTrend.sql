-- ============================================================================
-- SQL Script Name: apiTrend.sql
-- Module: API Exception & Health Intelligence
-- Purpose: Aggregates hourly API exception volume by Criticality Level.
--
-- Input Parameters:
--   @apiName VARCHAR(100) - Optional API Name filter
--
-- Expected Output:
--   criticalLevel VARCHAR(10) - Criticality Level (1, 2, 3)
--   timeWindow    VARCHAR(10) - Hour window
--   failureCount  INT         - Error volume
-- ============================================================================

SELECT
  ISNULL(CAST([errorCriticalLevel] AS VARCHAR(10)), '1') AS criticalLevel,
  CONVERT(VARCHAR(2), [recordInsertDateTime], 108) + ':00' AS timeWindow,
  COUNT(1) AS failureCount
FROM SAP_API_Error_Log
WHERE 1=1
  AND (@apiName IS NULL OR [apiName] = @apiName)
  AND CAST([recordInsertDateTime] AS DATE) = CAST(GETDATE() AS DATE)
GROUP BY [errorCriticalLevel], CONVERT(VARCHAR(2), [recordInsertDateTime], 108)
ORDER BY timeWindow ASC, criticalLevel ASC;
