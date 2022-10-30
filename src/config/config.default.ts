/* eslint-disable prettier/prettier */
import { MidwayConfig } from '@midwayjs/core';
import { User } from '../entity/user';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1664347491071_3649',
  koa: {
    port: 7001,
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
} as MidwayConfig;
