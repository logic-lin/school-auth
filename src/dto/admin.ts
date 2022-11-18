import { Rule, RuleType } from '@midwayjs/validate';
import { Role, VerifyStatus } from '../entity/user';
import { Password_Max_Length, Password_Min_Length } from './constrant/user';

export class VerifyAccountDTO {
  @Rule(RuleType.string().required())
  id: string;

  @Rule(
    RuleType.number().required().valid(VerifyStatus.Allow, VerifyStatus.Refuse)
  )
  verify_status: VerifyStatus;
}

export class UpdateAccountRoleDTO {
  @Rule(RuleType.string().required())
  id: string;

  @Rule(
    RuleType.number()
      .required()
      .valid(...Object.values(Role))
  )
  role: Role;
}

export class UpdateAccountPasswordDTO {
  @Rule(RuleType.string().required())
  id: string;

  // 密码
  @Rule(
    RuleType.string()
      .min(Password_Min_Length)
      .max(Password_Max_Length)
      .required()
  )
  password: string;
}
