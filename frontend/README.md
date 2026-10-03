# Ashok Leyland — Smart Manufacturing Operations Dashboard (MPAS) Frontend

Enterprise-grade React 19 + TypeScript + Vite + Tailwind CSS frontend architecture built for the Ashok Leyland Smart Manufacturing Operations Dashboard (MPAS).

---

## 🏛️ Architecture Breakdown & Folder Rationale

```
frontend/
├── index.html                   # HTML template loading Inter font and main entrypoint
├── package.json                 # React 19, Vite, TanStack Query, Tailwind CSS, Axios, ECharts
├── tsconfig.json                # Strict TypeScript configuration (noImplicitAny, zero 'any')
├── vite.config.ts               # Vite bundler config with @ path alias and API proxy
├── tailwind.config.js           # Clean enterprise theme palette (White, Slate, Blue, Amber, Red, Emerald)
└── src/
    ├── app/                     # Application root bootstrapper (`App.tsx`, `main.tsx`)
    ├── assets/                  # Static graphics, SVG logos, brand assets
    ├── components/
    │   ├── common/              # Generic reusable UI primitives (Button, Card, Badge, LoadingSpinner, ErrorBoundary)
    │   └── layout/              # Specialized layout components (TopHeader, Sidebar, MobileDrawer, Breadcrumb, NotificationDrawer, ProfileMenu, Footer)
    ├── layouts/
    │   ├── AuthLayout.tsx       # Authentication pages layout
    │   ├── DashboardLayout.tsx  # Main manufacturing dashboard layout
    │   └── ErrorLayout.tsx      # System error & 404 layout
    ├── pages/                   # Lazy-loaded page view modules (Overview, Production, Machines, Quality, SAP, Reports, Settings, Admin, NotFound)
    ├── modules/                 # Modular dashboard widget containers prepped for independent refreshes
    ├── hooks/                   # Custom hooks (`useSidebar`, `useTheme`, `useNotification`, `useRealtimeSocket`, `useDashboardQuery`)
    ├── services/                # API Service Abstraction Layer (`dashboard.service.ts`, `sap.service.ts`, `production.service.ts`)
    ├── api/                     # Axios HTTP client with request/response interceptors (`axiosClient.ts`)
    ├── contexts/                # React Contexts (`ThemeContext`, `NotificationContext`, `SocketContext`)
    ├── providers/               # Combined AppProviders (`QueryClientProvider`, Theme, Notification, Socket)
    ├── routes/                  # React Router DOM v6 route definitions with code splitting (`appRouter.tsx`)
    ├── types/                   # Strict TypeScript type definitions (`types/index.ts`)
    ├── interfaces/              # Domain interfaces (`dashboard.interface.ts`, etc.)
    ├── utils/                   # Helper utility functions
    ├── constants/               # Route path definitions (`routes.ts`) and Sidebar items (`navigation.ts`)
    ├── config/                  # Global frontend configuration settings (`app.config.ts`)
    ├── styles/                  # Tailwind CSS import directives (`index.css`)
    ├── icons/                   # Centralized React Icons barrel exports
    └── store/                   # UI preference persistence & local state
```

### Why Each Directory Exists

1. **`src/app/`**: Root bootstrap layer connecting global providers to the DOM root cleanly.
2. **`src/api/` & `src/services/`**: Central API communication layer. Ensures UI components **never** invoke `axios` directly, fulfilling the service abstraction rule.
3. **`src/providers/` & `src/contexts/`**: Central state engine encapsulating TanStack Query Client, Dark/Light Theme state, Realtime Socket connections, and Notification drawer management.
4. **`src/layouts/`**: Separates architectural page skeletons (`DashboardLayout`, `AuthLayout`, `ErrorLayout`) from business page logic.
5. **`src/routes/`**: Handles route configuration using React Router DOM with lazy-loading (`React.lazy()`) and Suspense code-splitting.
6. **`src/hooks/`**: Provides reusable custom hooks (`useDashboardQuery`, `useRealtimeSocket`, `useSidebar`, `useNotification`, `useTheme`) for clean component code.
7. **`src/types/` & `src/interfaces/`**: Ensures 100% strict type safety across the entire application with zero `any` types.

---

## ⚡ How to Run Locally

### 1. Install Dependencies
Open a terminal in the `frontend/` directory:
```bash
cd frontend
npm install
```

### 2. Configure Environment
Copy `.env.example` to `.env`:
```env
VITE_API_BASE_URL=/api
VITE_SOCKET_URL=ws://localhost:3000
VITE_APP_TITLE=Ashok Leyland MPAS Dashboard
```

### 3. Run Development Server
Start Vite development server:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Verify Type Safety
Check TypeScript type safety with zero `any` types:
```bash
npm run lint
```

### 5. Production Build
Compile TypeScript and bundle for production via Vite:
```bash
npm run build
```
