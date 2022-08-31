import { Pool, ResultSetHeader } from 'mysql2/promise';
import User from '../interfaces/user.interface';
import Login from '../interfaces/login.interface';

export default class UserModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async create(user: User): Promise<User> {
    const { username, classe, level, password } = user;
    const query = `INSERT INTO Trybesmith.Users
      (username, classe, level, password) VALUES (?, ?, ?, ?)`;
    const [result] = await this.connection
      .execute<ResultSetHeader>(query, [username, classe, level, password]);

    const { insertId } = result;
    return { id: insertId, ...user };
  }

  public async userLogin(user: Login): Promise<User | boolean > {
    const { username, password } = user;
    const query = 'SELECT * FROM Trybesmith.Users WHERE username = ? AND password = ?';

    const [result] = await this.connection.execute(query, [username, password]);
    const [findUser] = result as User[];

    return findUser;
  }
}