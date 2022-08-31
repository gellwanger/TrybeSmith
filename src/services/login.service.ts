import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import connection from '../models/connection';
import ILogin from '../interfaces/login.interface';
import UserModel from '../models/user.model';
import { jwtSecret, jwtConfig } from '../middlewares/token.middleware';

dotenv.config();

export default class LoginService {
  public userModel: UserModel;

  constructor() {
    this.userModel = new UserModel(connection);
  }

  public async login(user: ILogin): Promise<string | boolean > {
    const findUser = await this.userModel.userLogin(user);

    if (!findUser) return false;

    const token = jwt.sign({ data: findUser }, jwtSecret, jwtConfig);

    return token;
  }
}
