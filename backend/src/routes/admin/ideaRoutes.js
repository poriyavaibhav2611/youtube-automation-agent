import express from 'express';
import { getIdeas, getIdeaById, generateVideoForIdea } from '../../controllers/ideaController.js';
import { protect } from '../../middlewares/authMiddleware.js';

const router = express.Router();

router.use(protect); // Ensure route is protected

router.route('/').get(getIdeas);
router.route('/:id').get(getIdeaById);
router.route('/:id/generate').post(generateVideoForIdea);

export default router;
