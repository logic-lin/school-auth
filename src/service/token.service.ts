import { Provide, Inject } from '@midwayjs/decorator';
import { RedisService } from '@midwayjs/redis';
import { generateToken } from '../util/encrypt';

@Provide()
export class TokenService {
  @Inject()
  redisService: RedisService;

  async parseToken(token: string) {
    return await this.redisService.get(token);
  }

  async generateToken(userId, maxAge = 120) {
    const token = generateToken();
    await this.redisService.set(token, userId, 'EX', maxAge);
    return token;
  }
}
