import connection from '../models/connection';

import ProductModel from '../models/product.model';
import Product from '../interfaces/product.interface';

export default class ProductService {
  constructor(private model = new ProductModel(connection)) {}

  public createProduct = async (product: Product): Promise<Product> => 
    this.model.createProduct(product);

  public getAll = async (): Promise<Product[]> => this.model.getAll();

  public async update(orderId: number, productId: number): Promise<void> {
    await this.model.update(orderId, productId);
  }
}