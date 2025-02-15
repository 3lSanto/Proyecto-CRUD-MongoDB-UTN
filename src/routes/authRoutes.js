import { Router } from 'express';
import * as AuthController from '../controllers/authController.js';

const router = Router();

router.post('/auth/register', AuthController.register);
router.post('/auth/login', AuthController.login);
router.post('/auth/logout', AuthController.logout);

export default router;