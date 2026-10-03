const mssql = require('mssql/msnodesqlv8');

const connString = "Driver={ODBC Driver 17 for SQL Server};Server=DHANUSIYASRI;Database=MPAS_DB;Trusted_Connection=yes;";

async function testPool() {
  console.log('Testing mssql.ConnectionPool with connectionString...');
  const pool = new mssql.ConnectionPool({
    connectionString: connString
  });

  try {
    await pool.connect();
    console.log('✅ Pool Connected successfully!');
    const res = await pool.request().query('SELECT COUNT(*) AS TotalOrders FROM SAP_ZPP_SEQ_PLAN');
    console.log('QueryResult:', res.recordset);
    await pool.close();
  } catch (err) {
    console.error('❌ Pool connection failed:', err);
  }
}

testPool();
