import { Inject, Controller, Post, Body, Get } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import Validate from '../util/validateEn';
import {
  UpdateUserDTO,
  RegisterUserDTO,
  UpdateUserPasswordDTO,
} from '../dto/user';
import { UserService } from '../service/user.service';

@Controller('/api/user')
export class UserController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Get('/test')
  async test() {
    return { code: 200, message: 'OK', data: '123' };
  }

  @Post('/register')
  @Validate()
  async registerUser(@Body() user: RegisterUserDTO) {
    delete user.password_confirm;
    await this.userService.createUser(user);
    return { code: 200, message: 'OK', data: user };
  }

  @Post('/update')
  @Validate()
  async updateUser(@Body() user: UpdateUserDTO) {
    await this.userService.updateUser(user);
    return { success: true, message: 'OK', data: user };
  }

  @Post('/updatePassword')
  @Validate()
  async updatePassword(@Body() user: UpdateUserPasswordDTO) {
    delete user.password_confirm;
    await this.userService.updateUser(user);
    return { success: true, message: 'OK', data: user };
  }
}