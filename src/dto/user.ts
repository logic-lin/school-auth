import { Rule, RuleType } from '@midwayjs/validate';
import { Gender } from '../entity/user';
import {
  ID_Card_Length,
  Name_Max_Length,
  Password_Max_Length,
  Password_Min_Length,
  Phone_Length,
  Student_Card_Length,
} from './constrant/user';

export class LoginDTO {
  // 手机号/学号/邮箱
  @Rule(RuleType.string().required())
  account: string;

  // 密码
  @Rule(
    RuleType.string()
      .min(Password_Min_Length)
      .max(Password_Max_Length)
      .required()
  )
  password: string;
}

export class RegisterUserDTO {
  // 密码
  @Rule(
    RuleType.string()
      .min(Password_Min_Length)
      .max(Password_Max_Length)
      .required()
  )
  password: string;

  // 手机号
  @Rule(RuleType.string().length(Phone_Length).required())
  phone: string;

  // 邮箱
  @Rule(RuleType.string().required())
  email: string;
}

export class UpdateUserDTO {
  // 姓名
  @Rule(RuleType.string().max(Name_Max_Length).required())
  name: string;
  // 身份证号
  @Rule(RuleType.string().length(ID_Card_Length).required())
  id_card: string;
  // 学生号
  @Rule(RuleType.string().length(Student_Card_Length).required())
  student_card: string;
  // 性别
  @Rule(
    RuleType.number()
      .required()
      .valid(...Object.values(Gender))
  )
  gender: Gender;
  // 校卡审核照片
  @Rule(RuleType.string().required())
  certificate: string;
  // 手机号
  @Rule(RuleType.string().length(Phone_Length).required())
  phone: string;
  // 邮箱
  @Rule(RuleType.string().required())
  email: string;
}

export class UpdateUserPasswordDTO {
  @Rule(
    RuleType.string()
      .min(Password_Min_Length)
      .max(Password_Max_Length)
      .required()
  )
  old_password: string;

  // 密码
  @Rule(
    RuleType.string()
      .min(Password_Min_Length)
      .max(Password_Max_Length)
      .required()
  )
  password: string;
}
export class allowAuthDTO {
  @Rule(RuleType.string().required())
  appid: string;

  @Rule(RuleType.string().required())
  user_token: string;
}
