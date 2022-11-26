import {
  Inject,
  Controller,
  Post,
  Body,
  Get,
  Query,
} from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import Validate from '../util/validateEn';
import { ApplicationService } from '../service/application.service';
import { JwtService } from '@midwayjs/jwt';
import { JwtPassportMiddleware } from '../middleware/jwt.middleware';
import {
  GetApplicationNameDTO,
  RegisterApplicationDTO,
} from '../dto/application';
import { allowAuthDTO } from '../dto/user';
import { TokenService } from '../service/token.service';

@Controller('/api/application')
export class ApplicationController {
  @Inject()
  ctx: Context;

  @Inject()
  applicationService: ApplicationService;

  @Inject()
  tokenService: TokenService;

  @Inject()
  jwt: JwtService;

  @Get('/test', { middleware: [JwtPassportMiddleware] })
  async test() {
    return { code: 200, message: 'OK', data: this.ctx.state };
  }

  @Get('/getApplicationName', { middleware: [JwtPassportMiddleware] })
  @Validate()
  async getApplicationName(@Query() data: GetApplicationNameDTO) {
    const id: string = data.id;
    const application = await this.applicationService.getApplicationById(id);
    return { success: true, message: 'OK', data: application?.name };
  }

  @Get('/getApplicationList', { middleware: [JwtPassportMiddleware] })
  @Validate()
  async getApplicationList() {
    const user_id: string = this.ctx.state.user.id;
    const data = await this.applicationService.getApplicationList(user_id);
    return { success: true, message: 'OK', data };
  }

  @Post('/registerApplication', { middleware: [JwtPassportMiddleware] })
  @Validate()
  async registerApplication(@Body() application: RegisterApplicationDTO) {
    const user_id: string = this.ctx.state.user.id;
    const data = await this.applicationService.createApplication({
      user_id,
      ...application,
    });
    return {
      success: true,
      message: 'OK',
      data,
    };
  }

  @Post('/allowAuth')
  @Validate()
  async allowAuth(@Body() params: allowAuthDTO) {
    // const userId = this.ctx.state.user.id;
    const appid = params.appid;
    const user_token = params.user_token;
    const user_id = (this.jwt.decodeSync(user_token) as any)?.id || '';
    const data = await this.applicationService.getApplicationById(appid);
    if (!data)
      return { success: false, message: 'appid is wrong or not exist' };
    const code = await this.tokenService.generateToken(user_id);
    this.ctx.redirect(data.callback_url + `?code=${code}`);
  }
}
