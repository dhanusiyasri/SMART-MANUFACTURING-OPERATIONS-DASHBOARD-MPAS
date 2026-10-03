-- ============================================================================
-- SQL Script Name: apiCriticality.sql
-- Module: API Exception & Health Intelligence
-- Purpose: Aggregates error count by Criticality Level.
--
-- Input Parameters: None
--
-- Expected Output:
--   criticalLevel VARCHAR(10) - Level 1, Level 2, or Level 3
--   errorCount    INT         - Number of errors
-- ============================================================================

SELECT
  ISNULL(CAST([errorCriticalLevel] AS VARCHAR(10)), '1') AS criticalLevel,
  COUNT(1) AS errorCount
FROM SAP_API_Error_Log
GROUP BY [errorCriticalLevel]
ORDER BY criticalLevel ASC;
