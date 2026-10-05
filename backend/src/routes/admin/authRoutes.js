import express from 'express';
import { registerUser, loginUser, loginVerify, logoutUser } from '../../controllers/authController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/login-verify', loginVerify);
router.post('/logout', logoutUser);

export default router;
