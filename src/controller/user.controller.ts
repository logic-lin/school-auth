import {
  Inject,
  Controller,
  Post,
  Body,
  Get,
  Files,
} from '@midwayjs/decorator';
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
import { VerifyStatus } from '../entity/user';
import roleToPermissions from '../util/roleToPermissions';

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

  @Post('/upload')
  async upload(@Files() files) {
    const file = files?.[0];
    const url = 'static/' + file.data.match(/\\([^\\]*?)$/)[1];
    return {
      url,
      files,
    };
  }

  @Post('/register')
  @Validate()
  async registerUser(@Body() user: RegisterUserDTO) {
    console.log('test');
    delete user.password_confirm;
    const data = await this.userService.createUser(user);
    return {
      success: true,
      message: 'OK',
      data: { ...data, permissions: roleToPermissions(data) },
      token: await this.jwt.sign({ id: data.id, role: data.role }),
    };
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
      data: { ...findUser, permissions: roleToPermissions(findUser) },
      token: await this.jwt.sign({ id: findUser.id, role: findUser.role }),
    };
  }

  @Get('/getUserInfo', { middleware: [JwtPassportMiddleware] })
  async getUserInfo() {
    const id = this.ctx.state.user.id;
    const userInfo = await this.userService.getUserById(id);
    delete userInfo.password;
    return {
      success: true,
      message: 'OK',
      data: { ...userInfo, permissions: roleToPermissions(userInfo) },
    };
  }

  @Post('/update', { middleware: [JwtPassportMiddleware] })
  @Validate()
  async updateUser(@Body() user: UpdateUserDTO) {
    const id = this.ctx.state.user.id;
    await this.userService.updateUser({
      id,
      ...user,
      verify_status: VerifyStatus.Pending,
    });
    const userInfo = await this.userService.getUserById(id);
    delete userInfo.password;
    return {
      success: true,
      message: 'OK',
      data: { ...userInfo, permissions: roleToPermissions(userInfo) },
    };
  }

  @Post('/updatePassword', { middleware: [JwtPassportMiddleware] })
  @Validate()
  async updatePassword(@Body() user: UpdateUserPasswordDTO) {
    const id = this.ctx.state.user.id;
    const findUser = await this.userService.getUserById(id);
    if (findUser.password !== user.old_password) {
      return { success: false, message: 'password is wrong!' };
    }
    delete user.old_password;
    delete user.password_confirm;
    await this.userService.updateUser({ id, ...user });
    return { success: true, message: 'OK' };
  }
}
