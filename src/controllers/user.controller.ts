import dotenv from 'dotenv';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import UserService from '../services/user.service';
import { jwtSecret, jwtConfig } from '../middlewares/token.middleware';

dotenv.config();

export default class UserController {
  private service: UserService;

  constructor() {
    this.service = new UserService();
  }

  public create = async (req:Request, res: Response) => {
    const user = req.body;
    const newUser = await this.service.create(user);

    const token = jwt.sign({ data: newUser }, jwtSecret, jwtConfig);

    res.status(201).json({ token });
  };
}
