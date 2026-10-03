# 🏭 Smart Manufacturing Operations Dashboard — MPAS

> **Real-Time Manufacturing Operations Intelligence with SAP Integration, Production Monitoring, and Operational Analytics**

The **Smart Manufacturing Operations Dashboard (MPAS)** is a full-stack manufacturing operations platform designed to provide centralized, real-time visibility into production activities, SAP data synchronization, assembly-line operations, vehicle receipts, sequence planning, and system health.

The system integrates **SAP data with the MPAS database and operational dashboard**, enabling manufacturing teams to monitor production information and enterprise-system synchronization through a centralized interface.

---

## 📌 Project Overview

Modern manufacturing environments depend on multiple interconnected systems such as **SAP, production systems, databases, APIs, and assembly-line applications**.

Monitoring these systems independently can make it difficult to identify synchronization issues, production abnormalities, and operational bottlenecks.

The **Smart Manufacturing Operations Dashboard — MPAS** addresses this by providing an integrated operational intelligence layer.

```text
SAP
 │
 │ SAP Integration
 ▼
MPAS Database
 │
 │ Backend APIs
 ▼
Operations Dashboard
 │
 ├── Production Monitoring
 ├── Sequence Monitoring
 ├── SAP Synchronization
 ├── Vehicle Receipts
 ├── API Health
 └── Database Health
```

---

# 🎯 Objectives

The project aims to:

* Integrate SAP data with the MPAS ecosystem
* Provide centralized manufacturing operations visibility
* Monitor SAP-to-MPAS synchronization
* Track assembly-line production activity
* Monitor production sequences
* Monitor vehicle receipts and production flow
* Identify synchronization abnormalities
* Monitor API and database health
* Provide real-time operational information
* Establish a foundation for advanced manufacturing analytics

---

# ✨ Key Features

## 🔗 1. SAP Integration Module

The system includes an implemented **SAP Integration Module** that connects SAP-originated manufacturing information with the MPAS operational environment.

The integration layer is responsible for bringing relevant SAP data into the MPAS ecosystem for downstream monitoring and analytics.

### SAP Integration Flow

```text
┌──────────────────┐
│       SAP        │
│ Enterprise Data  │
└────────┬─────────┘
         │
         │ SAP Integration
         ▼
┌──────────────────┐
│  Integration     │
│     Layer        │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│    MPAS DB       │
│ Microsoft SQL    │
│     Server       │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Backend Services │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Operations       │
│   Dashboard      │
└──────────────────┘
```

The SAP integration enables the dashboard to work with enterprise manufacturing data rather than relying only on manually entered or isolated dashboard data.

---

## 📊 2. Production Monitoring

The dashboard provides visibility into manufacturing production operations.

Monitoring areas include:

* Production volume
* Vehicle receipts
* Production activity
* Assembly-line activity
* Production sequence information
* Line-wise operational data

---

## 🔄 3. SAP Synchronization Monitoring

The system monitors the movement of SAP-originated information into the MPAS environment.

This provides visibility into:

* SAP data synchronization
* Data availability
* Synchronization status
* SAP-related operational records
* Synchronization activity
* Potential data inconsistencies

---

## 🏗️ 4. Assembly-Line Monitoring

The platform supports line-wise manufacturing monitoring.

Current project scope includes:

```text
Plant 2004
│
├── Assembly Line 0101
├── Assembly Line 0201
└── Assembly Line 0203
```

The architecture can be extended to additional manufacturing plants and assembly lines.

---

## 📋 5. Sequence Monitoring

The system provides access to manufacturing sequence-plan information through backend services.

Example:

```http
GET /api/dashboard/sequence-plans
```

This enables the dashboard to retrieve and visualize relevant production-sequence information.

---

## 🚗 6. Vehicle Receipt Monitoring

The platform is designed to monitor vehicle receipt and production-related information from the manufacturing database.

This allows operations teams to observe production flow and identify deviations in expected activity.

---

## ⚡ 7. Real-Time Dashboard Updates

The backend uses **Socket.IO** to support real-time communication between the backend and dashboard.

```text
Backend
   │
   │ Socket.IO
   ▼
Dashboard
   │
   ▼
Real-Time Operational Updates
```

This reduces the need for continuous manual page refreshes.

---

## ❤️ 8. System Health Monitoring

The backend includes health monitoring capabilities for application and database availability.

Example:

```http
GET /api/health
```

The health monitoring layer can verify:

* Backend availability
* Server status
* Database connectivity
* MSSQL availability
* Application environment

---

# 🏗️ System Architecture

```text
                         ┌──────────────────────┐
                         │         SAP          │
                         │ Enterprise System    │
                         └──────────┬───────────┘
                                    │
                                    │ SAP Integration
                                    ▼
                         ┌──────────────────────┐
                         │   SAP Integration    │
                         │       Module         │
                         └──────────┬───────────┘
                                    │
                                    ▼
                    ┌──────────────────────────────┐
                    │       MPAS Database         │
                    │      Microsoft SQL Server   │
                    └──────────────┬───────────────┘
                                   │
                                   ▼
                    ┌──────────────────────────────┐
                    │       Backend API Layer      │
                    │                              │
                    │ Node.js + Express + TypeScript│
                    └──────────────┬───────────────┘
                                   │
                         ┌─────────┴─────────┐
                         │                   │
                         ▼                   ▼
                    REST APIs           Socket.IO
                         │                   │
                         └─────────┬─────────┘
                                   │
                                   ▼
                    ┌──────────────────────────────┐
                    │   Smart Operations Dashboard │
                    │                              │
                    │ Production Monitoring         │
                    │ SAP Synchronization           │
                    │ Sequence Monitoring            │
                    │ Vehicle Receipts               │
                    │ System Health                  │
                    └──────────────────────────────┘
```

---

# 🧰 Technology Stack

## Frontend

* React.js
* TypeScript / JavaScript
* HTML5
* CSS
* Dashboard UI components

## Backend

* Node.js
* Express.js
* TypeScript
* Socket.IO

## Database

* Microsoft SQL Server
* MSSQL Node.js Driver

## Enterprise Integration

* SAP Integration Module
* SAP-originated manufacturing data
* MPAS database synchronization

## Backend Utilities

* Zod — environment/configuration validation
* Winston — structured logging
* Morgan — HTTP request logging
* Helmet — security headers
* CORS — cross-origin request management

## Development Tools

* Git
* GitHub
* npm
* TypeScript

---

# 📂 Project Structure

```text
SMART-MANUFACTURING-OPERATIONS-DASHBOARD-MPAS/
│
├── backend/
│   └── ...
│
├── frontend/
│   └── ...
│
├── src/
│   ├── config/
│   ├── database/
│   ├── socket/
│   ├── repositories/
│   ├── services/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── app.ts
│   └── server.ts
│
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```

---

# 🚀 Getting Started

## 1. Clone the Repository

```bash
git clone https://github.com/dhanusiyasri/SMART-MANUFACTURING-OPERATIONS-DASHBOARD-MPAS.git
```

```bash
cd SMART-MANUFACTURING-OPERATIONS-DASHBOARD-MPAS
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Configure Environment Variables

Create a `.env` file from the example configuration:

### Windows

```bash
copy .env.example .env
```

### Linux / macOS

```bash
cp .env.example .env
```

Configure the required database and application settings:

```env
PORT=3000
NODE_ENV=development

CORS_ORIGIN=*

DB_USER=your_username
DB_PASSWORD=your_password
DB_SERVER=localhost
DB_DATABASE=MPAS_DB
DB_PORT=1433

DB_ENCRYPT=false
DB_TRUST_SERVER_CERTIFICATE=true
```

> ⚠️ **Never commit database credentials or `.env` files to GitHub.**

---

# 🗄️ Database Configuration

The MPAS backend uses **Microsoft SQL Server** for manufacturing operational data.

Typical configuration:

| Variable                      | Purpose                      |
| ----------------------------- | ---------------------------- |
| `DB_USER`                     | SQL Server username          |
| `DB_PASSWORD`                 | SQL Server password          |
| `DB_SERVER`                   | SQL Server host              |
| `DB_DATABASE`                 | MPAS database                |
| `DB_PORT`                     | SQL Server port              |
| `DB_ENCRYPT`                  | SQL encryption configuration |
| `DB_TRUST_SERVER_CERTIFICATE` | Certificate configuration    |

The SAP integration layer works with the MPAS ecosystem so that SAP-originated information can be consumed by downstream services and dashboard components.

---

# ▶️ Running the Application

## Development

```bash
npm run dev
```

Backend:

```text
http://localhost:3000
```

---

## Production Build

```bash
npm run build
```

Then:

```bash
npm start
```

---

# 🔌 API Endpoints

## Health Check

```http
GET /api/health
```

Used to verify backend and database availability.

---

## Dashboard Test

```http
GET /api/dashboard/test
```

Used to verify dashboard/database connectivity.

---

## Sequence Plans

```http
GET /api/dashboard/sequence-plans
```

Retrieve manufacturing sequence-plan information.

Optional:

```http
GET /api/dashboard/sequence-plans?limit=10
```

---

# ⚡ Real-Time Communication

The application uses **Socket.IO** for real-time communication.

```text
Client
  │
  │ WebSocket
  ▼
Socket.IO Server
  │
  ▼
Manufacturing Data
  │
  ▼
Dashboard Update
```

Example event:

```text
dashboard:update
```

Line-level subscriptions can be used for targeted operational updates.

---

# 📈 Manufacturing Intelligence

The dashboard brings together multiple operational dimensions:

| Module                     | Purpose                                     |
| -------------------------- | ------------------------------------------- |
| SAP Integration            | Integrate SAP-originated manufacturing data |
| Production Monitoring      | Monitor production activity                 |
| Sequence Monitoring        | Track production sequence information       |
| Vehicle Receipts           | Monitor vehicle production flow             |
| Synchronization Monitoring | Observe SAP/MPAS data movement              |
| API Health                 | Monitor backend services                    |
| Database Health            | Monitor MSSQL connectivity                  |
| Line Monitoring            | Monitor assembly-line operations            |
| Operational Analytics      | Analyze manufacturing information           |

---

# 🔍 Operational Data Flow

```text
SAP
 │
 ▼
SAP Integration
 │
 ▼
MPAS Data Layer
 │
 ▼
Microsoft SQL Server
 │
 ▼
Backend Services
 │
 ├── Production APIs
 ├── Sequence APIs
 ├── Health APIs
 └── Real-Time Socket Services
 │
 ▼
Operations Dashboard
```

---

# 🧠 Future Analytics Extensions

The current platform provides the operational data foundation required for advanced analytics.

Potential extensions include:

* Production forecasting
* Line-wise production prediction
* Anomaly detection
* Production-drop detection
* Automated root-cause analysis
* Synchronization anomaly detection
* Predictive maintenance
* Manufacturing KPI intelligence
* Automated operational alerts

These capabilities can be developed on top of the existing SAP + MPAS data pipeline.

---

# 🔐 Security

The application follows basic backend security practices including:

* Environment-based configuration
* CORS configuration
* Helmet security headers
* Input/configuration validation
* Structured logging
* Centralized error handling
* Externalized database credentials

Do not commit:

```text
.env
database credentials
SAP credentials
API keys
access tokens
production secrets
```

---

# 🧪 Validation Checklist

Before running the complete system, verify:

```text
✓ Node.js installed
✓ npm dependencies installed
✓ Environment variables configured
✓ MSSQL server available
✓ MPAS database accessible
✓ SAP integration configured
✓ Backend started successfully
✓ REST APIs accessible
✓ Socket.IO connection established
✓ Dashboard connected to backend
```

---

# 🏭 Manufacturing Scope

The system is designed around a manufacturing environment involving:

```text
                 SAP
                  │
                  ▼
        ┌─────────────────┐
        │ SAP Integration │
        └────────┬────────┘
                 │
                 ▼
          MPAS Database
                 │
       ┌─────────┼─────────┐
       ▼         ▼         ▼
     0101      0201      0203
     Line      Line      Line
       │         │         │
       └─────────┼─────────┘
                 ▼
       Operations Dashboard
```

This architecture allows manufacturing information from multiple operational areas to be brought into a centralized monitoring environment.

---

# 📊 Project Impact

The platform is designed to provide:

* Centralized manufacturing visibility
* SAP-to-MPAS data integration
* Real-time operational monitoring
* Assembly-line visibility
* Production sequence monitoring
* Faster identification of synchronization issues
* Database and API health visibility
* A foundation for predictive manufacturing analytics

---

# 🔮 Future Enhancements

* [ ] Advanced production forecasting
* [ ] ML-based anomaly detection
* [ ] Automated root-cause analysis
* [ ] Predictive maintenance
* [ ] Automated alert and notification system
* [ ] Role-based authentication
* [ ] Historical KPI analytics
* [ ] Advanced production dashboards
* [ ] Docker deployment
* [ ] CI/CD pipeline
* [ ] Cloud deployment
* [ ] Automated unit and integration testing

---

# 👥 Authors

**Dhanusiya Sri M**
**Arunadevi M**
**Anline Pranetha P**

**B.E. Computer Science & Engineering**
**Sri Venkateswara College of Engineering**

---

# 📜 License

This project is developed for educational, academic, portfolio, and demonstration purposes.

If an organizational or institutional license applies, the appropriate license information should be added here.

---

## ⭐ Project Summary

**Smart Manufacturing Operations Dashboard — MPAS** is a full-stack manufacturing operations intelligence platform that integrates **SAP-originated manufacturing data with the MPAS database and a real-time web dashboard**.

It provides centralized visibility into **SAP synchronization, production operations, assembly-line activity, sequence planning, vehicle receipts, API health, and database health**, while establishing a foundation for future **AI-driven manufacturing analytics and predictive decision support**.
