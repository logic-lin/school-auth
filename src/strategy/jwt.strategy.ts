import { CustomStrategy, PassportStrategy } from '@midwayjs/passport';
import { Strategy } from 'passport-jwt';
import { Config } from '@midwayjs/decorator';

@CustomStrategy()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  @Config('jwt')
  jwtConfig;

  async validate(payload) {
    return payload;
  }

  getStrategyOptions(): any {
    return {
      secretOrKey: this.jwtConfig.secret,
      jwtFromRequest: req => {
        return req?.header?.token;
      },
    };
  }
}
