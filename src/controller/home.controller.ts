import { Controller, Get, Inject } from '@midwayjs/decorator';
import { UserService } from '../service/user.service';

@Controller('/')
export class HomeController {
  @Inject()
  userService: UserService;

  @Get('/home')
  async home(): Promise<string> {
    return 'Hello Midwayjs!';
  }
}
