import express from 'express';
import { getPipelineVideos, updateVideoStatus } from '../../controllers/pipelineController.js';
import { protect } from '../../middlewares/authMiddleware.js';

const router = express.Router();

router.use(protect); // Ensure route is protected

router.route('/').get(getPipelineVideos);
router.route('/:id/status').put(updateVideoStatus);

export default router;
