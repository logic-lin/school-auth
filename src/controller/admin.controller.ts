import {
  Inject,
  Controller,
  Post,
  Body,
  UseGuard,
  Get,
} from '@midwayjs/decorator';
import { Role } from '../entity/user';
import { Context } from '@midwayjs/koa';
import Validate from '../util/validateEn';
import { UpdateUserPasswordDTO } from '../dto/user';
import { UserService } from '../service/user.service';
import { JwtService } from '@midwayjs/jwt';
import { JwtPassportMiddleware } from '../middleware/jwt.middleware';
import { AuthGuard } from '../guard/auth.guard';
import { AllowRole } from '../decorator/role.decorator';

@UseGuard(AuthGuard)
@Controller('/api/admin')
export class UserController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Inject()
  jwt: JwtService;

  @AllowRole([Role.Admin, Role.Super])
  @Post('/verifyUser', { middleware: [JwtPassportMiddleware] })
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

  @AllowRole([Role.Admin, Role.Super])
  @Get('/test', { middleware: [JwtPassportMiddleware] })
  @Validate()
  async test() {
    console.log(this.ctx?.state?.user);
    return { success: true, message: 'OK' };
  }
}
