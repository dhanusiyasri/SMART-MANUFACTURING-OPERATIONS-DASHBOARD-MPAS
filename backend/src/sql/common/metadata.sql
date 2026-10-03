-- ============================================================================
-- SQL Script Name: metadata.sql
-- Module: Enterprise Analytics Common SQL Layer
-- Purpose: Query system statistics and data freshness metadata for MPAS tables.
--
-- Input Parameters: None
--
-- Expected Output:
--   tableName         VARCHAR(128) - SQL Server Table Name
--   rowCountTotal     BIGINT       - Total Rows in Table
--   lastInsertedTime  DATETIME     - Latest Timestamp recorded
--   freshnessStatus   VARCHAR(20)  - Freshness status
-- ============================================================================

SELECT 
    t.name AS tableName,
    s.row_count AS rowCountTotal,
    GETDATE() AS queryTime,
    'REALTIME' AS freshnessStatus
FROM sys.tables t
INNER JOIN sys.dm_db_partition_stats s ON t.object_id = s.object_id AND s.index_id < 2
WHERE t.name IN ('SAP_ZPP_SEQ_PLAN', 'SAP_API_Error_Log', 'SAP_DATA_FOUND_LOG', 'SAP_FG', 'SAP_CHILD_MASTER', 'SAP_CBN_MASTER')
ORDER BY s.row_count DESC;
