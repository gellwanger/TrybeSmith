import connection from '../models/connection';

import OrderModel from '../models/order.model';
import ProductModel from '../models/product.model';
import { Order, OrderPlus } from '../interfaces/order.interface';

export default class ProductService {
  public model: OrderModel;

  public modelProduct: ProductModel;
  
  constructor() {
    this.model = new OrderModel(connection);

    this.modelProduct = new ProductModel(connection);
  }

  public async getAll(): Promise<Order[] | OrderPlus[]> {
    const orders = await this.model.getAll();
    const products = await this.modelProduct.getAll();

    const fullOrders = orders.map(({ id, userId }) => ({
      id,
      userId,
      productsIds: products
        .filter(({ orderId }) => orderId === id)
        .map((product) => product.id),
    }));

    return fullOrders;
  }

  public async create(userId: number): Promise<number> {
    return this.model.create(userId);
  }
}
