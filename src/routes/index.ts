import { Router } from 'express';
import { healthRoutes } from './health.routes.js';
import { dashboardRoutes } from './dashboard.routes.js';
import { analyticsRoutes } from '../analytics/routes/analytics.routes.js';
import { configRoutes } from '../config/routes/config.routes.js';

const router = Router();

router.use('/health', healthRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/analytics', analyticsRoutes);
router.use('/config', configRoutes);

export const apiRouter = router;
