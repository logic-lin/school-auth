import {
  Inject,
  Controller,
  Post,
  Body,
  UseGuard,
  Get,
  Query,
} from '@midwayjs/decorator';
import { Role } from '../entity/user';
import { Context } from '@midwayjs/koa';
import Validate from '../util/validateEn';
import { UserService } from '../service/user.service';
import { JwtService } from '@midwayjs/jwt';
import { JwtPassportMiddleware } from '../middleware/jwt.middleware';
import { AuthGuard } from '../guard/auth.guard';
import { AllowRole } from '../decorator/role.decorator';
import { QueryPaginationDTO } from '../dto/common';
import { VerifyAccountDTO } from '../dto/admin';

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
  @Post('/verifyAccount', { middleware: [JwtPassportMiddleware] })
  @Validate()
  async verifyUser(@Body() verifyData: VerifyAccountDTO) {
    const { id, verify_status } = verifyData;
    const findUser = await this.userService.getUserById(id);
    if (findUser.verify_status === null) {
      return {
        success: false,
        message: '该用户还未更新审核资料',
      };
    }
    await this.userService.updateUser({ id, verify_status });
    return { success: true, message: 'OK' };
  }

  @AllowRole([Role.Admin, Role.Super])
  @Get('/getAccountList', { middleware: [JwtPassportMiddleware] })
  @Validate()
  async getAccountList(@Query() pagination: QueryPaginationDTO) {
    const { page, size } = pagination;
    const userList = await this.userService.getUserList(page, size);
    userList.data.map(v => {
      delete v.password;
      return v;
    });
    return {
      success: true,
      message: 'OK',
      data: {
        ...userList,
        page,
        size,
      },
    };
  }

  @AllowRole([Role.Admin, Role.Super])
  @Get('/test', { middleware: [JwtPassportMiddleware] })
  @Validate()
  async test() {
    console.log(this.ctx?.state?.user);
    return { success: true, message: 'OK' };
  }
}
