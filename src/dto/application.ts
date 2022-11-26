import { Rule, RuleType } from '@midwayjs/validate';
export class RegisterApplicationDTO {
  @Rule(RuleType.string().max(200).required())
  name: string;

  @Rule(RuleType.string())
  description: string;

  @Rule(RuleType.string())
  callback_url: string;
}

export class GetApplicationNameDTO {
  @Rule(RuleType.string().required())
  id: string;
}
