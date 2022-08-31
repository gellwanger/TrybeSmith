import { Router } from 'express';
import UserController from '../controllers/user.controller';
import { 
  passwordValidation,
  usernameValidation,
  classeValidation,
  levelValidation,
} from '../middlewares/user.middleware';

const userRouter = Router();
const userController = new UserController();

userRouter.post(
  '/', 
  usernameValidation,
  passwordValidation,
  classeValidation,
  levelValidation,
  userController.create,
);

export default userRouter;
