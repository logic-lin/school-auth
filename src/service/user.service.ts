import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterUserDTO } from '../dto/user';
import { Role, User } from '../entity/user';
import { encryptPassword } from '../util/encrypt';

@Provide()
export class UserService {
  @InjectEntityModel(User)
  userModel: Repository<User>;

  async updateUser(user: Omit<Partial<User>, 'id'> & { id: string }) {
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

  async getUserList(page: number, size: number) {
    const [data, total] = await Promise.all([
      this.userModel
        .createQueryBuilder()
        .skip((page - 1) * size)
        .take(size)
        .getMany(),
      this.userModel.createQueryBuilder().getCount(),
    ]);
    return { data, total };
  }
  async initSuper() {
    const rootEmail = 'root@super.com';
    const rootPhone = '13823608739';
    const rootPassowrd = encryptPassword('1234567890');
    const findSuper = await this.userModel.findOne({
      where: {
        email: rootEmail,
        phone: rootPhone,
      },
    });
    if (!findSuper) {
      await this.userModel.save({
        email: rootEmail,
        phone: rootPhone,
        password: rootPassowrd,
        role: Role.Super,
      });
    } else {
      await this.userModel.update(findSuper.id, {
        email: rootEmail,
        phone: rootPhone,
        password: rootPassowrd,
        role: Role.Super,
      });
    }
    return {
      email: rootEmail,
      phone: rootPhone,
      password: '1234567890',
    };
  }
}
