import express from 'express';
import { getStrategy, saveStrategy, activateStrategy } from '../../controllers/strategyController.js';
import { protect } from '../../middlewares/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.get('/', getStrategy);
router.post('/', saveStrategy);
router.post('/activate', activateStrategy);

export default router;
