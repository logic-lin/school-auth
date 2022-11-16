/* eslint-disable prettier/prettier */
import { MidwayConfig } from '@midwayjs/core';
import { join } from 'path';
import { User } from '../entity/user';
const uploadWhiteList = ['.jpg', '.png', '.jpeg', '.webp', '.gif', '.bmp', '.wbmp', '.tif']
export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1664347491071_3649',
  koa: {
    port: 7001,
  },
  jwt: {
    secret: '114514233123', // fs.readFileSync('xxxxx.key')
    expiresIn: '1d', // https://github.com/vercel/ms
  },
  passport: {
    session: false,
  },
  typeorm: {
    dataSource: {
      default: {
        type: 'mysql',
        driver: require('mysql2'),
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '',
        database: 'develop',
        synchronize: true, // 如果第一次使用，不存在表，有同步的需求可以写 true
        logging: false,
        // 配置实体模型 或者 entities: '/entity',
        entities: [User],
      },
    },
  },
  upload: {
    // mode: UploadMode, 默认为file，即上传到服务器临时目录，可以配置为 stream
    mode: 'file',
    // fileSize: string, 最大上传文件大小，默认为 10mb
    fileSize: '5mb',
    // whitelist: string[]，文件扩展名白名单
    whitelist: uploadWhiteList,
    // tmpdir: string，上传的文件临时存储路径
    tmpdir: join(__dirname, '../../uploadFile'),
    // cleanTimeout: number，上传的文件在临时目录中多久之后自动删除，默认为 5 分钟
    cleanTimeout: 0,
    // base64: boolean，设置原始body是否是base64格式，默认为false，一般用于腾讯云的兼容
    base64: false,
  },
  staticFile: {
    dirs: {
      default: {
        prefix: '/',
        dir: 'public',
      },
      another: {
        prefix: '/static',
        dir: 'uploadFile',
      },
    },
    maxAge: 1000 * 60 * 60,
    // ...
  },
} as MidwayConfig;
