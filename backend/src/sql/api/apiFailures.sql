-- ============================================================================
-- SQL Script Name: apiFailures.sql
-- Module: API Exception & Health Intelligence
-- Purpose: Ranks top failing SAP RFC endpoints.
--
-- Input Parameters: None
--
-- Expected Output:
--   apiName      VARCHAR(100) - Endpoint URL
--   failureCount INT          - Total exception count
-- ============================================================================

SELECT TOP 5
  ISNULL([apiName], '/sap/updateQRV2') AS apiName,
  COUNT(1) AS failureCount
FROM SAP_API_Error_Log
GROUP BY [apiName]
ORDER BY failureCount DESC;
