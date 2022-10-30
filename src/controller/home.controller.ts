import { Controller, Get } from '@midwayjs/decorator';

@Controller('/')
export class HomeController {
  @Get('/home')
  async home(): Promise<string> {
    return 'Hello Midwayjs!';
  }
}
