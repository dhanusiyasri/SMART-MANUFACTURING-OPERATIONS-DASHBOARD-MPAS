import { Router } from 'express';
import { configController } from '../controllers/config.controller.js';

const router = Router();

/**
 * GET /dashboard
 * Returns current plant configuration (Plant 2004 read-only) and available production lines dynamically from SQL DB.
 */
router.get('/dashboard', configController.getDashboardConfig);

export const configRoutes = router;
export const configRouter = router;
export default router;
