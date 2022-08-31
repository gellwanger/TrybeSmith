import { Router } from 'express';
import LoginController from '../controllers/login.controller';
import { passwordValidation, usernameValidation } from '../middlewares/user.middleware';

const loginRouter = Router();
const loginController = new LoginController();

loginRouter.post('/', usernameValidation, passwordValidation, loginController.login);

export default loginRouter;
