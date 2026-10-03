import { Router } from 'express';
import { dashboardController } from '../controllers/dashboard.controller.js';
import { validateDashboardQuery } from '../validators/dashboard.validator.js';

const router = Router();

// GET /api/dashboard/test -> SELECT COUNT(*) AS TotalOrders FROM SAP_ZPP_SEQ_PLAN
router.get('/test', validateDashboardQuery, dashboardController.getTestMetrics);

export const dashboardRoutes = router;
