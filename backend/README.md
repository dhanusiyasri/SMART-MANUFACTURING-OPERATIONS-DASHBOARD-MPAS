# Smart Manufacturing Operations Dashboard - Enterprise Backend

Enterprise-grade Node.js + Express backend service written in TypeScript for the Smart Manufacturing Operations Dashboard.

---

## 🏗️ Architecture Overview

```
backend/
├── .env                         # Environment configurations
├── .env.example                 # Environment variables template
├── package.json                 # Project dependencies & scripts
├── tsconfig.json                # Strict TypeScript configuration
├── README.md                    # System documentation
└── src/
    ├── config/
    │   ├── env.config.ts        # Zod environment validation
    │   └── logger.config.ts     # Winston logger & Morgan HTTP stream
    ├── database/
    │   └── connectionManager.ts # Singleton MSSQL Pool (DHANUSIYASRI / MPAS_DB / Windows Auth)
    ├── controllers/
    │   ├── health.controller.ts # Route controller for /api/health
    │   └── dashboard.controller.ts # Route controller for /api/dashboard/test
    ├── services/
    │   ├── health.service.ts    # Health verification business logic
    │   └── dashboard.service.ts # Dashboard business logic & Socket hooks
    ├── repositories/
    │   └── dashboard.repository.ts # Repository layer (SELECT COUNT(*) AS TotalOrders FROM SAP_ZPP_SEQ_PLAN)
    ├── routes/
    │   ├── health.routes.ts     # /api/health router
    │   ├── dashboard.routes.ts  # /api/dashboard router
    │   └── index.ts             # Aggregated API router
    ├── middleware/
    │   ├── error.middleware.ts  # Global error handling
    │   ├── logging.middleware.ts# Morgan HTTP logging
    │   └── notFound.middleware.ts# 404 handler
    ├── utils/
    │   ├── apiResponse.ts       # Standardized response wrapper
    │   └── appError.ts          # Custom AppError class
    ├── types/
    │   └── index.ts             # Strict shared types (0% `any`)
    ├── interfaces/
    │   ├── database.interface.ts# Database contracts
    │   └── dashboard.interface.ts# Dashboard contracts
    ├── socket/
    │   └── socketServer.ts      # Prepared HTTP + Socket.IO container
    ├── validators/
    │   └── dashboard.validator.ts# Request query/body validators
    ├── logs/
    │   ├── error.log            # Error logs
    │   └── combined.log         # Complete runtime logs
    ├── app.ts                   # Express application setup
    └── server.ts                # HTTP Server bootstrap & graceful shutdown
```

---

## ⚡ How to Run Locally

### 1. Install Dependencies
Open a terminal in the `backend/` directory:
```bash
cd backend
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env` (pre-configured for Windows Auth on `DHANUSIYASRI` server and `MPAS_DB` database):
```env
PORT=3000
NODE_ENV=development
CORS_ORIGIN=*

DB_SERVER=DHANUSIYASRI
DB_DATABASE=MPAS_DB
DB_PORT=1433
DB_USE_WINDOWS_AUTH=true
```

### 3. Run Development Server
Start the server with hot reloading:
```bash
npm run dev
```

### 4. Verify Type Safety
Check strict TypeScript typing without generating JS build files:
```bash
npm run lint
```

### 5. Build for Production
Compile the project to JavaScript in the `dist/` directory:
```bash
npm run build
npm start
```

---

## 🔌 API Documentation

### 1. Health Check Endpoint
- **URL**: `GET /api/health`
- **Response**:
```json
{
  "status": "healthy",
  "database": "connected"
}
```

### 2. Test Dashboard Endpoint
- **URL**: `GET /api/dashboard/test`
- **Query Executed**: `SELECT COUNT(*) AS TotalOrders FROM SAP_ZPP_SEQ_PLAN`
- **Response**:
```json
{
  "success": true,
  "data": {
    "totalOrders": 10426
  }
}
```

---

## 🛡️ Production & Future Compatibility Design

- **Zero `any` Types**: Strict TypeScript type checking enabled across all components.
- **Repository Pattern**: No SQL query is ever written inside route files or controllers. Layer flow: `Controller -> Service -> Repository -> SQL Server`.
- **Connection Manager**: Singleton connection pool created once for Microsoft SQL Server (`DHANUSIYASRI` / `MPAS_DB`) and reused across all requests.
- **Socket.IO Readiness**: `socketServer.ts` wraps the `http.Server` instance so real-time WebSockets can push database changes to the React frontend seamlessly without modifying existing REST endpoints.
