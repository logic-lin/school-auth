import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user';

@Provide()
export class UserService {
  @InjectEntityModel(User)
  userModel: Repository<User>;

  async getUserList() {
    return await this.userModel.find({
      select: ['id', 'name', 'card', 'gender'],
    });
  }

  async createUser(user: User) {
    return await this.userModel.save(user);
  }
}
