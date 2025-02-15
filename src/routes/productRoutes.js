import { Router } from 'express';

import * as ProductController from '../controllers/productController.js';
import { authRequired } from '../middleware/verifyToken.js';


const router = Router();

router.get('/products',authRequired, ProductController.getProducts);
router.post('/products',authRequired, ProductController.createProduct);
router.get('/products/:id',authRequired, ProductController.getProduct);
router.put('/products/:id',authRequired, ProductController.updateProduct);
router.delete('/products/:id',authRequired, ProductController.deleteProduct);


export default router;