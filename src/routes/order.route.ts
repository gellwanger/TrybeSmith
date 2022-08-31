import { Router } from 'express';
import OrderController from '../controllers/order.controller';
import { authValidation } from '../middlewares/token.middleware';
import orderValidation from '../middlewares/order.middleware';

const orderRouter = Router();
const orderController = new OrderController();

orderRouter.get('/', orderController.getAll);
orderRouter.post('/', authValidation, orderValidation, orderController.create);

export default orderRouter;