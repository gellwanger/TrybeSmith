import { Pool, ResultSetHeader } from 'mysql2/promise';
import { Order } from '../interfaces/order.interface';

export default class OrderModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAll(): Promise<Order[]> {
    const [orders] = await this.connection.execute('SELECT * FROM Trybesmith.Orders');

    return orders as Order[];
  }

  public async create(userId: number): Promise<number> {
    const [{ insertId }] = await this.connection.query<ResultSetHeader>(
      'INSERT INTO Trybesmith.Orders (userId) VALUES (?)',
      [userId],
    );
    return insertId;
  }
}