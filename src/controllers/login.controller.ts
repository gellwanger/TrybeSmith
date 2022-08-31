import { Request, Response } from 'express';
import Login from '../interfaces/login.interface';
import LoginService from '../services/login.service';

export default class LoginController {
  private service: LoginService;

  constructor() {
    this.service = new LoginService();
  }

  public login = async (req: Request, res: Response) => {
    const { username, password } = req.body as Login;
    
    const user = await this.service.login({ username, password });

    if (!user) {
      return res.status(401).json({ message: 'Username or password invalid' });
    }

    res.status(200).json({ token: user });
  };
}
