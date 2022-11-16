import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import {
  RegisterUserDTO,
  UpdateUserDTO,
  UpdateUserPasswordDTO,
} from '../dto/user';
import { User, VerifyStatus } from '../entity/user';

@Provide()
export class UserService {
  @InjectEntityModel(User)
  userModel: Repository<User>;

  async updateUser(
    user:
      | (UpdateUserDTO & { id: string; verify_status?: VerifyStatus })
      | (UpdateUserPasswordDTO & { id: string })
  ) {
    const id = user.id;
    delete user.id;
    return await this.userModel.update(id, user);
  }

  async getUserByAccount(account: string, password: string) {
    const findUser = await this.userModel.findOne({
      where: [
        { phone: account, password },
        { student_card: account, password },
        { email: account, password },
      ],
    });
    if (findUser && findUser.password) delete findUser.password;
    return findUser;
  }

  async getUserById(id: string) {
    return await this.userModel.findOne({ where: { id } });
  }

  async createUser(user: RegisterUserDTO) {
    return await this.userModel.save(user);
  }
}
