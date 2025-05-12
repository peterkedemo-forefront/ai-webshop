import { Router } from 'express';
import * as productController from '../controllers/productController';
import { jwtMiddleware } from '../middleware/jwtMiddleware';
import { adminMiddleware } from '../middleware/adminMiddleware';

const router = Router();

router.get('/', productController.getProducts);
router.get('/:id', productController.getProduct);

router.post('/', jwtMiddleware, adminMiddleware, productController.createProduct);
router.put('/:id', jwtMiddleware, adminMiddleware, productController.updateProduct);
router.delete('/:id', jwtMiddleware, adminMiddleware, productController.deleteProduct);

export default router;
