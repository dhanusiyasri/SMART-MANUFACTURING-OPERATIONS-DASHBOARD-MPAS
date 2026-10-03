# Smart Manufacturing Operations Dashboard - Backend API

Production-ready Node.js + Express backend service written in TypeScript for Smart Manufacturing Operations Dashboards. Integrates with Microsoft SQL Server (MSSQL), features single-instance connection pooling, repository pattern for database queries, real-time WebSocket capabilities via Socket.IO, structured logging with Winston, and Zod environment validation.

---

## 🌟 Key Features

- **TypeScript Express Core**: Clean, strictly typed modular architecture (`controllers`, `services`, `repositories`, `database`, `middleware`, `config`).
- **Resilient Connection Pool**: MSSQL Database connection pool initialized once via Singleton SQL Manager using official `mssql` package with auto-healing and graceful shutdown.
- **Repository Pattern**: All database queries isolated inside repositories (no inline SQL inside routes or controllers).
- **Real-Time Data Ready**: Full Socket.IO integration for live manufacturing telemetry streaming, room subscriptions, and broadcasting.
- **Health Verification**: `/api/health` endpoint verifying server status and live MSSQL ping query (`SELECT 1`).
- **Production Security & Logging**: Helmet security headers, CORS protection, Winston structured logger, Morgan HTTP traffic tracking, Zod environment validation.

---

## 📂 Project Architecture

```
c:\Users\msdha\Downloads\Ashok Leyland\Project\
├── .env                         # Local environment variables
├── .env.example                 # Environment variables template
├── package.json                 # Dependencies & scripts
├── tsconfig.json                # TypeScript configuration
├── README.md                    # Project documentation
└── src/
    ├── config/
    │   ├── env.ts               # Environment validation (Zod)
    │   └── logger.ts            # Winston logger & morgan stream
    ├── database/
    │   └── sqlManager.ts        # Shared MSSQL Connection Pool Manager
    ├── socket/
    │   └── socketManager.ts     # Real-time Socket.IO instance & events
    ├── repositories/
    │   └── dashboard.repository.ts # SQL query execution (SAP_ZPP_SEQ_PLAN)
    ├── services/
    │   └── dashboard.service.ts    # Business logic & socket emission hooks
    ├── controllers/
    │   ├── dashboard.controller.ts # Dashboard HTTP endpoints
    │   └── health.controller.ts    # Health check endpoint
    ├── routes/
    │   ├── dashboard.routes.ts     # /api/dashboard router
    │   ├── health.routes.ts        # /api/health router
    │   └── index.ts                # API root router (/api)
    ├── middleware/
    │   ├── error.middleware.ts     # Global error handling
    │   ├── httpLogger.middleware.ts# Request logging
    │   └── notFound.middleware.ts  # 404 handler
    ├── app.ts                      # Express app setup
    └── server.ts                   # HTTP + Socket.IO server & shutdown hooks
```

---

## 🚀 Getting Started

### 1. Installation
Install the project dependencies:
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env` and fill in your MSSQL credentials:
```env
PORT=3000
NODE_ENV=development
CORS_ORIGIN=*

DB_USER=sa
DB_PASSWORD=YourPassword123!
DB_SERVER=localhost
DB_DATABASE=ManufacturingDB
DB_PORT=1433
DB_ENCRYPT=false
DB_TRUST_SERVER_CERTIFICATE=true
```

### 3. Run Development Server
Start the server in hot-reloading development mode:
```bash
npm run dev
```

### 4. Build & Run in Production
Compile TypeScript code to JavaScript in `dist/` and run node server:
```bash
npm run build
npm start
```

---

## 🛰️ API Endpoints & WebSocket Events

### HTTP Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Health check endpoint verifying process uptime & MSSQL database ping |
| `GET` | `/api/dashboard/test` | Sample endpoint executing `SELECT COUNT(*) AS TotalOrders FROM SAP_ZPP_SEQ_PLAN` |
| `GET` | `/api/dashboard/sequence-plans` | Fetch recent sequence plan records (query param `?limit=10`) |

#### Sample `/api/dashboard/test` Response
```json
{
  "success": true,
  "message": "SAP ZPP Sequence Plan metrics retrieved successfully",
  "timestamp": "2026-07-25T11:30:00.000Z",
  "data": {
    "totalOrders": 1250,
    "queriedAt": "2026-07-25T11:30:00.000Z",
    "sourceTable": "SAP_ZPP_SEQ_PLAN"
  }
}
```

#### Sample `/api/health` Response
```json
{
  "status": "UP",
  "timestamp": "2026-07-25T11:30:00.000Z",
  "uptime": 120.45,
  "service": "smart-manufacturing-backend",
  "environment": "development",
  "components": {
    "database": {
      "status": "UP",
      "provider": "MSSQL",
      "message": "SQL Server connection is active and responsive",
      "responseTimeMs": 8
    }
  }
}
```

---

## 🔌 Socket.IO Real-Time Streaming

The backend runs a Socket.IO server alongside the HTTP REST API.

- **Connection URL**: `ws://localhost:3000`
- **Room Subscription**:
  - `subscribe:line` (payload: line ID e.g., `'LINE_01'`)
- **Emitted Broadcast Events**:
  - `dashboard:update`: Emitted when new order metrics or sequence plan updates occur.

---

## 🛡️ License & Support
Smart Manufacturing Operations Backend — Built for enterprise reliability and high concurrency.
