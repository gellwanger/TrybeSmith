import { Request, Response } from 'express';
import { getUserIdByToken } from '../middlewares/token.middleware';
import OrderService from '../services/order.service';
import ProductService from '../services/product.service';

export default class OrderController {
  private service: OrderService;

  private productService: ProductService;

  constructor() {
    this.service = new OrderService();
    this.productService = new ProductService();
  }

  public getAll = async (_req: Request, res: Response) => {
    const orders = await this.service.getAll();

    res.status(200).json(orders);
  };

  public create = async (req: Request, res: Response) => {
    const token = req.headers.authorization as string;
    const { productsIds } = req.body;
    
    const userId = getUserIdByToken(token);

    const orderId = await this.service.create(userId);

    await Promise.all(productsIds.map((productId: number) =>
      this.productService.update(orderId, productId)));

    res.status(201).json({ userId, productsIds });
  };
}
