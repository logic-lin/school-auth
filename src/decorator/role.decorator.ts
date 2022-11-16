// src/decorator/role.decorator.ts
import { savePropertyMetadata } from '@midwayjs/core';
import { Role } from '../entity/user';

export const ROLE_META_KEY = 'role:name';

export function AllowRole(roleName: Role | Role[]): MethodDecorator {
  return (target, propertyKey, descriptor) => {
    roleName = [].concat(roleName);
    // 只保存元数据
    savePropertyMetadata(ROLE_META_KEY, roleName, target, propertyKey);
  };
}
