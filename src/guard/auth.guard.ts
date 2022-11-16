import { Guard, IGuard, getPropertyMetadata, Inject } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';

import { ROLE_META_KEY } from '../decorator/role.decorator';
import { Role } from '../entity/user';

@Guard()
export class AuthGuard implements IGuard<Context> {
  @Inject()
  ctx: Context;

  async canActivate(
    context: Context,
    supplierClz,
    methodName: string
  ): Promise<boolean> {
    // 从类元数据上获取角色信息
    const roleNameList = getPropertyMetadata<Role[]>(
      ROLE_META_KEY,
      supplierClz,
      methodName
    );

    if (roleNameList && roleNameList.length && context.state?.user?.role) {
      // 假设中间件已经拿到了用户角色信息，保存到了 context.user.role 中
      // 直接判断是否包含该角色
      return roleNameList.includes(context.state.user.role);
    }
    return false;
  }
}
