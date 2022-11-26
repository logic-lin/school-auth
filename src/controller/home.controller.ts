import { Context } from '@midwayjs/koa';
import { Controller, Get, Inject, Query } from '@midwayjs/decorator';
import { UserService } from '../service/user.service';

@Controller('/home')
export class HomeController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Get('/home')
  async home(): Promise<string> {
    return 'Hello Midwayjs!';
  }

  @Get('/callback')
  async callback(@Query() query) {
    this.ctx.headers['access-control-allow-origin'] = 'http://localhost:7001';
    return query;
  }

  // @Post('/upload')
  // async upload(@Files() files, @Fields() fields) {
  //   /*
  //   files = [
  //     {
  //       filename: 'test.pdf',        // 文件原名
  //       data: '/var/tmp/xxx.pdf',    // mode 为 file 时为服务器临时文件地址
  //       fieldname: 'test1',          // 表单 field 名
  //       mimeType: 'application/pdf', // mime
  //     },
  //     {
  //       filename: 'test.pdf',        // 文件原名
  //       data: ReadStream,    // mode 为 stream 时为服务器临时文件地址
  //       fieldname: 'test2',          // 表单 field 名
  //       mimeType: 'application/pdf', // mime
  //     },
  //     // ...file 下支持同时上传多个文件
  //   ]

  //   */
  //   return {
  //     files,
  //     fields,
  //   };
  // }
}
