# Enterprise Analytics SQL Layer Architecture

Centralized SQL Layer for **Ashok Leyland – Smart Manufacturing Operations Dashboard (MPAS)** powering Microsoft Power BI, Microsoft Fabric, and SAP Analytics Cloud integration endpoints.

---

## 📁 Directory Structure

```
backend/src/sql/
├── common/
│   ├── filters.sql                  # Reusable parameterized WHERE clause filter fragments
│   └── metadata.sql                 # SQL Server DMV query for table row counts & freshness
├── executive/
│   └── executiveSummary.sql         # Multi-table cross-module executive KPI aggregation
├── production/
│   ├── productionKPIs.sql           # Sequence order summary KPIs (SAP_ZPP_SEQ_PLAN)
│   ├── productionTrend.sql          # Hourly line output velocity line graph data
│   ├── plantComparison.sql          # Plant production volume ranking
│   ├── lineComparison.sql           # Line throughput comparison
│   ├── materialDistribution.sql     # Material platform treemap distribution
│   └── hourlyHeatmap.sql            # 2D Line vs Hour productivity heat matrix
├── api/
│   ├── apiKPIs.sql                  # API error log KPIs (SAP_API_ERROR_LOG)
│   ├── apiTrend.sql                 # Hourly exception velocity by criticality level
│   ├── apiFailures.sql              # Top failed SAP RFC endpoints
│   └── apiCriticality.sql           # Level 1/2/3 error distribution
├── synchronization/
│   ├── synchronizationKPIs.sql      # 4.7M+ telemetry log KPIs (SAP_DATA_FOUND_LOG)
│   ├── synchronizationTrend.sql     # Daily telemetry volume trend
│   ├── throughput.sql               # Interface processing volume ranking
│   └── workloadHeatmap.sql          # 2D Interface vs Hour workload heat matrix
├── finishedGoods/
│   ├── finishedGoodsKPIs.sql        # Finished goods receipt KPIs (SAP_FG)
│   ├── stageDistribution.sql        # Vehicle stage distribution (MPAS_OK, QC)
│   └── completionTrend.sql          # Hourly vehicle completion velocity
├── masterData/
│   ├── supplierDistribution.sql     # Vendor / Supplier component distribution
│   └── categoryDistribution.sql     # Material type (FERT/HALB/ROH) SKU counts
└── README.md                        # Documentation & Best Practices Guide
```

---

## 🚀 How Repositories Load SQL Files

Repositories load these `.sql` files at initialization time or execute them using `mssql` parameterized query requests (`pool.request().input('param', value).query(sqlString)`).

### Example (`AnalyticsRepository` in TypeScript):
```typescript
import { connectionManager } from '../../database/connectionManager.js';

export async function getProductionKpis(plantCode?: string) {
  const pool = await connectionManager.getPool();
  const req = pool.request();
  
  if (plantCode) {
    req.input('plant', plantCode);
  }
  
  const result = await req.query(sqlQueryString);
  return result.recordset[0];
}
```

---

## 🔍 Filter Strategy

All queries implement **SARGable parameterized predicates**:
- `@plant`: `VARCHAR(10)`
- `@line`: `VARCHAR(20)`
- `@startDate`: `DATETIME`
- `@endDate`: `DATETIME`
- `@apiName`: `VARCHAR(100)`
- `@status`: `VARCHAR(20)`

Pattern:
```sql
WHERE 1=1
  AND (@plant IS NULL OR [WERKS] = @plant)
  AND (@line IS NULL OR [LINE] = @line)
  AND (@startDate IS NULL OR [CREATED_DATE] >= @startDate)
  AND (@endDate IS NULL OR [CREATED_DATE] <= @endDate);
```

---

## 🛠️ Adding New Analytics Queries

1. Create a new `.sql` file under the appropriate domain folder (`production/`, `api/`, `synchronization/`, etc.).
2. Include the standard header comment block:
   ```sql
   -- Purpose: ...
   -- Input Parameters: ...
   -- Expected Output: ...
   -- Performance Notes: ...
   ```
3. Avoid `SELECT *`. Always explicitly project required columns.
4. Ensure all aggregations (`SUM`, `COUNT`, `AVG`) happen inside SQL Server before returning to Node.js.

---

## ⚡ SQL Server Performance Rules

1. **No Client-Side Aggregation**: Millions of records in `SAP_DATA_FOUND_LOG` are aggregated directly in SQL Server.
2. **Index Usage**:
   - `IX_SAP_DATA_FOUND_LOG_apiName_numberOfRecords`
   - `IX_SAP_DATA_FOUND_LOG_recordInsertDateTime`
   - `IX_SAP_ZPP_SEQ_PLAN_WERKS_STATUS`
   - `IX_SAP_API_ERROR_LOG_CRITICAL_LEVEL`
3. **Future Ready**: Queries are formatted as pure standard SQL statements, ready to be wrapped in **Stored Procedures** (`CREATE PROCEDURE sp_...`) or **Views** without altering Node.js repository contracts.
