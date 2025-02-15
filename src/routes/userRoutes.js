import { Router }  from 'express';
import * as UserController from '../controllers/userController.js';
import { authRequired } from '../middleware/verifyToken.js';

const router = Router();

router.get('/users',authRequired, UserController.getUsers);
router.get('/profile',authRequired, UserController.profile);
router.get('/users/:id',authRequired, UserController.getUser);
router.put('/users/:id',authRequired, UserController.updateUser);
router.delete('/users/:id',authRequired, UserController.deleteUser);



export default router;
