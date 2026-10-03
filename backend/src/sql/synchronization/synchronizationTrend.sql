-- ============================================================================
-- SQL Script Name: synchronizationTrend.sql
-- Module: Synchronization Intelligence
-- Purpose: Aggregates daily telemetry record volume across the past 7 days.
--
-- Input Parameters: None
--
-- Expected Output:
--   dayName      VARCHAR(10) - Day of week (Mon, Tue...)
--   recordsCount BIGINT      - Total processed records
-- ============================================================================

SELECT
  DATENAME(WEEKDAY, [recordInsertDateTime]) AS dayName,
  SUM(ISNULL([numberOfRecords], 1000)) AS recordsCount
FROM SAP_DATA_FOUND_LOG WITH (NOLOCK)
WHERE [recordInsertDateTime] >= DATEADD(DAY, -7, GETDATE())
GROUP BY DATENAME(WEEKDAY, [recordInsertDateTime]), CAST([recordInsertDateTime] AS DATE)
ORDER BY CAST([recordInsertDateTime] AS DATE) ASC;
