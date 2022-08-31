import connection from '../models/connection';
import IUser from '../interfaces/user.interface';
import UserModel from '../models/user.model';

export default class UserService {
  public model: UserModel;

  constructor() {
    this.model = new UserModel(connection);
  }

  public async create(user: IUser): Promise<IUser> {
    return this.model.create(user);
  }
}
