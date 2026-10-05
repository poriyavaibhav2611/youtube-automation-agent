import express from 'express';
import { uploadVideo } from '../../controllers/youtubeController.js';
import { protect } from '../../middlewares/authMiddleware.js';

const router = express.Router();

router.use(protect);
router.post('/upload', uploadVideo);

export default router;
