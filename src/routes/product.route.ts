import { Router } from 'express';
import ProductController from '../controllers/product.controller';
import { productAmountValidation, productNameValidation } from '../middlewares/product.middleware';

const productRouter = Router();

const productController = new ProductController();

productRouter.get('/', productController.getAll);

productRouter.post(
  '/', 
  productNameValidation,
  productAmountValidation,
  productController.createProduct,
);

export default productRouter;
