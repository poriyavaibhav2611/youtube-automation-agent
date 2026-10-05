import express from 'express';
import { getProductions, startProduction, approveProduction, repairScene, getDashboardStats } from '../../controllers/productionController.js';
import { protect } from '../../middlewares/authMiddleware.js';

const router = express.Router();

router.use(protect);
router.route('/stats').get(getDashboardStats);
router.route('/').get(getProductions).post(startProduction);
router.route('/:id/approve').post(approveProduction);
router.route('/:id/repair').post(repairScene);

export default router;
