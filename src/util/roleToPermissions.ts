import { Role, User, VerifyStatus } from '../entity/user';
const normalPermission = ['manage-userinfo'];
const adminPermission = ['verify-account'].concat(normalPermission);
const superPermission = ['manage-account'].concat(adminPermission);
const verifyUserPermission = ['authorize', 'home'];
const mp: Record<Role, Array<string>> = {
  [Role.Super]: superPermission,
  [Role.Admin]: adminPermission,
  [Role.Normal]: normalPermission,
};

function roleToPermissions(userInfo: User) {
  const { role, verify_status } = userInfo;
  let arr;
  if (verify_status === VerifyStatus.Allow)
    arr = mp[role].concat(verifyUserPermission);
  else arr = mp[role];
  return arr.reduce((ls, key) => {
    ls[key] = ['write', 'read'];
    return ls;
  }, {});
}
export default roleToPermissions;
