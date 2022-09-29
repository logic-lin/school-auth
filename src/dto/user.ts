import { Rule, RuleType } from '@midwayjs/validate';
import { Gender } from '../entity/enum/user';

export class CreateUserDTO {
  @Rule(RuleType.string().max(10).required())
  name: string;

  @Rule(RuleType.string().max(10).required())
  password: string;

  @Rule(RuleType.string().length(18))
  card: string;

  @Rule(RuleType.number().valid(...Object.values(Gender)))
  gender: Gender;
}

export class UpdateUserDTO {
  @Rule(RuleType.number().required())
  id: string;

  @Rule(RuleType.string().max(10))
  name: string;

  @Rule(RuleType.string().max(10))
  password: string;

  @Rule(RuleType.string().length(18))
  card: string;

  @Rule(RuleType.number().valid(...Object.values(Gender)))
  gender: Gender;
}

export class OperateUserByIdDTO {
  @Rule(RuleType.number().required())
  id: string;
}
