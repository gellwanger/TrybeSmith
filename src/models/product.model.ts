import { Pool, ResultSetHeader } from 'mysql2/promise';
import Product from '../interfaces/product.interface';

export default class ProductModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public createProduct = async (product: Product): Promise<Product> => {
    const { name, amount } = product;
    
    const [dataInsert] = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Products (name, amount) VALUES (?, ?)',
      [name, amount],
    );

    const { insertId } = dataInsert;
    return { id: insertId, ...product };
  };

  public getAll = async (): Promise<Product[]> => {
    const [rows] = await this.connection.execute(
      'SELECT * FROM Trybesmith.Products',
    );

    return rows as Product[];
  };

  public async update(orderId: number, productId: number): Promise<void> {
    const query = 'UPDATE Trybesmith.Products SET orderId = ? WHERE id = ?';
    await this.connection.query(query, [orderId, productId]);
  }
}
