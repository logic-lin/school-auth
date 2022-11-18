import { Rule, RuleType } from '@midwayjs/validate';
import { VerifyStatus } from '../entity/user';

export class VerifyAccountDTO {
  @Rule(RuleType.string().required())
  id: string;

  @Rule(
    RuleType.number().required().valid(VerifyStatus.Allow, VerifyStatus.Refuse)
  )
  verify_status: VerifyStatus;
}
