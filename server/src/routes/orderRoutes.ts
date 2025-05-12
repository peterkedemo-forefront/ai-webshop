import { Router } from 'express';
import * as orderController from '../controllers/orderController';

const router = Router();

router.post('/', orderController.placeOrder);

export default router; 