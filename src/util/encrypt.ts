import { createHash } from 'crypto';

const SALT = '114514233aaa';

export function encryptPassword(password) {
  return createHash('md5').update(SALT).update(password).digest('hex');
}

export function generateToken() {
  return encryptPassword(
    ((Math.random() * 10000) & 0) + '' + new Date().getTime() + '114514'
  );
}
