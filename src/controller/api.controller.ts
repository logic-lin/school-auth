import { Inject, Controller, Get, Query } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import Validate from '../util/validateEn';
import { CreateUserDTO } from '../dto/user';
// import { User } from '../entity/user';
import { UserService } from '../service/user.service';
import { User } from '../entity/user';

@Controller('/api/user')
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Get('/list')
  async getUserList() {
    const user = await this.userService.getUserList();
    return { success: true, message: 'OK', data: user };
  }

  @Get('/create')
  @Validate()
  async createUser(@Query() user: CreateUserDTO) {
    const _user = new User();
    for (const key of Object.keys(user)) _user[key] = user[key];
    await this.userService.createUser(_user);
    return { success: true, message: 'OK', data: _user };
  }
}
