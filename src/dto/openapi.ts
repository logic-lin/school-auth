import { Rule, RuleType } from '@midwayjs/validate';
export class GetUserInfoDTO {
  @Rule(RuleType.string().required())
  appid: string;

  @Rule(RuleType.string().required())
  secret: string;

  @Rule(RuleType.string().required())
  code: string;
}
