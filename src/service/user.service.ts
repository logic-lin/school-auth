import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import {
  RegisterUserDTO,
  UpdateUserDTO,
  UpdateUserPasswordDTO,
} from '../dto/user';
import { User } from '../entity/user';

@Provide()
export class UserService {
  @InjectEntityModel(User)
  userModel: Repository<User>;

  async updateUser(user: UpdateUserDTO | UpdateUserPasswordDTO) {
    const id = user.id;
    delete user.id;
    return await this.userModel.update(id, user);
  }

  async getUser(id: string) {
    return await this.userModel.findOne({
      where: { id },
    });
  }

  async createUser(user: RegisterUserDTO) {
    return await this.userModel.save(user);
  }
}
