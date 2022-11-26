import { Inject, Controller, Get, Post, Body } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import Validate from '../util/validateEn';
import { JwtService } from '@midwayjs/jwt';
import { JwtPassportMiddleware } from '../middleware/jwt.middleware';
import { GetUserInfoDTO } from '../dto/openapi';
import { UserService } from '../service/user.service';
import { TokenService } from '../service/token.service';
import { ApplicationService } from '../service/application.service';

@Controller('/openapi')
export class ApplicationController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Inject()
  tokenService: TokenService;

  @Inject()
  applicationService: ApplicationService;

  @Inject()
  jwt: JwtService;

  @Get('/test', { middleware: [JwtPassportMiddleware] })
  async test() {
    return { code: 200, message: 'OK', data: this.ctx.state };
  }

  @Post('/getUserInfo')
  @Validate()
  async getUserInfo(@Body() data: GetUserInfoDTO) {
    const { appid, secret, code } = data;
    const application = await this.applicationService.getApplicationById(appid);

    if (application?.secret !== secret)
      return { success: false, message: 'secret is wrong' };

    const user_id = await this.tokenService.parseToken(code);
    if (!user_id) return { success: false, message: 'code is expire' };

    const user_info = await this.userService.getUserById(user_id);
    delete user_info.password;
    return { success: true, message: 'OK', data: user_info };
  }
}
