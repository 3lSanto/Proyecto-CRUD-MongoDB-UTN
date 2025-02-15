import { Router } from 'express';
import * as CategoryController from '../controllers/categoryController.js';

import { authRequired } from '../middleware/verifyToken.js';
import verifyRole from '../middleware/verifyRole.js';


const router = Router();

router.get('/categories',authRequired, CategoryController.getCategories);
router.post('/categories',[authRequired, verifyRole.isAdmin], CategoryController.createCategory);
router.get('/categories/:id',authRequired, CategoryController.getCategory);
router.put('/categories/:id',authRequired, CategoryController.updateCategory);
router.delete('/categories/:id',authRequired, CategoryController.deleteCategory);

export default router;