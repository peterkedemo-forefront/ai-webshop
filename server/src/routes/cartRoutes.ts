import { Router } from 'express';
import * as cartController from '../controllers/cartController';

const router = Router();

router.post('/', cartController.createCart);
router.get('/:cartId', cartController.getCart);
router.post('/:cartId/items', cartController.addOrUpdateCartItem);
router.delete('/:cartId/items/:productId', cartController.removeCartItem);

export default router;
