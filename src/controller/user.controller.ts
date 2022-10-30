import { Inject, Controller, Post, Body, Get } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import Validate from '../util/validateEn';
import {
  UpdateUserDTO,
  RegisterUserDTO,
  UpdateUserPasswordDTO,
  LoginDTO,
} from '../dto/user';
import { UserService } from '../service/user.service';
import { JwtService } from '@midwayjs/jwt';
import { JwtPassportMiddleware } from '../middleware/jwt.middleware';

@Controller('/api/user')
export class UserController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Inject()
  jwt: JwtService;

  @Get('/test', { middleware: [JwtPassportMiddleware] })
  async test() {
    return { code: 200, message: 'OK', data: this.ctx.state };
  }

  @Post('/register')
  @Validate()
  async registerUser(@Body() user: RegisterUserDTO) {
    delete user.password_confirm;
    await this.userService.createUser(user);
    return { success: true, message: 'OK' };
  }

  @Post('/login')
  @Validate()
  async login(@Body() user: LoginDTO) {
    const findUser = await this.userService.getUserByAccount(
      user.account,
      user.password
    );
    if (!findUser) {
      return {
        success: false,
        message: 'password is wrong or user is not exist!',
      };
    }
    return {
      success: true,
      message: 'OK',
      data: findUser,
      t: await this.jwt.sign({ id: findUser.id }),
    };
  }

  @Get('/getUserInfo', { middleware: [JwtPassportMiddleware] })
  async getUserInfo() {
    const id = this.ctx.state.user.id;
    const useInfo = await this.userService.getUserById(id);
    delete useInfo.password;
    return { success: true, message: 'OK', data: useInfo };
  }

  @Post('/update', { middleware: [JwtPassportMiddleware] })
  @Validate()
  async updateUser(@Body() user: UpdateUserDTO) {
    await this.userService.updateUser(user);
    return { success: true, message: 'OK' };
  }

  @Post('/updatePassword', { middleware: [JwtPassportMiddleware] })
  @Validate()
  async updatePassword(@Body() user: UpdateUserPasswordDTO) {
    const findUser = await this.userService.getUserById(user.id);
    if (findUser.password !== user.old_password) {
      return { success: false, message: 'password is wrong!' };
    }
    delete user.old_password;
    delete user.password_confirm;
    await this.userService.updateUser(user);
    return { success: true, message: 'OK' };
  }
}
