-- ============================================================================
-- SQL Script Name: filters.sql
-- Module: Enterprise Analytics Common SQL Layer
-- Purpose: Reusable parameterized WHERE clause filter logic for SQL Server queries.
--
-- Input Parameters:
--   @plantCode         VARCHAR(10)   - Plant Code (e.g. '2004', '2005', '2001')
--   @lineCode          VARCHAR(20)   - Assembly Line Code (e.g. 'LINE-01')
--   @fromDate     DATETIME      - Filter start date
--   @toDate       DATETIME      - Filter end date
--   @shift         VARCHAR(10)   - Shift Code ('Shift A', 'Shift B', 'Shift C')
--   @material      VARCHAR(40)   - Material Master Code (e.g. 'MAT-AL-8820')
--   @orderNumber   VARCHAR(40)   - Production Order / Sequence Number
--   @apiName       VARCHAR(100)  - SAP Interface API Endpoint
--   @status        VARCHAR(20)   - Execution Status ('SUCCESS', 'PENDING', 'FAILED')
--
-- Performance Notes:
--   - All checks evaluate against non-null parameters to ensure index seek behavior.
--   - Uses SARGable predicates for DATE/DATETIME filtering.
-- ============================================================================

-- Snippet 1: Standard Table Filter Predicate (SAP_ZPP_SEQ_PLAN)
/*
WHERE 1=1
  AND (@plantCode IS NULL OR [plantCode] = @plantCode)
  AND (@lineCode IS NULL OR [lineCode] = @lineCode)
  AND (@fromDate IS NULL OR [recordInsertDateTime] >= @fromDate)
  AND (@toDate IS NULL OR [recordInsertDateTime] <= @toDate)
  AND (@material IS NULL OR [MaterialCode] = @material)
  AND (@orderNumber IS NULL OR [PLNUM] = @orderNumber)
  AND (@status IS NULL OR [SAPStatusCode] = @status)
*/

-- Snippet 2: API Error Log Filter Predicate (SAP_API_Error_Log)
/*
WHERE 1=1
  AND (@plantCode IS NULL OR [plantCode] = @plantCode)
  AND (@lineCode IS NULL OR [lineCode] = @lineCode)
  AND (@apiName IS NULL OR [apiName] = @apiName)
  AND (@fromDate IS NULL OR [recordInsertDateTime] >= @fromDate)
  AND (@toDate IS NULL OR [recordInsertDateTime] <= @toDate)
  AND (@status IS NULL OR [SAPStatusCode] = @status)
*/

-- Snippet 3: Synchronization Data Found Log Filter Predicate (SAP_DATA_FOUND_LOG)
/*
WHERE 1=1
  AND (@plantCode IS NULL OR [plantCode] = @plantCode)
  AND (@apiName IS NULL OR [apiName] = @apiName OR [apiName] = @apiName)
  AND (@fromDate IS NULL OR [recordInsertDateTime] >= @fromDate)
  AND (@toDate IS NULL OR [recordInsertDateTime] <= @toDate)
  AND (@status IS NULL OR [SAPStatusCode] = @status)
*/
