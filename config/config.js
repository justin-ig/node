const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  development: {
    username: 'admin',
    password: process.env.DB_PASSWORD_PROD,
    database: 'react-nodebird',
    host: 'kdt9-test-justin.cwps8vphy3dm.ap-northeast-2.rds.amazonaws.com',
    // username: 'root',
    // password: process.env.DB_PASSWORD,
    // database: 'react-nodebird',
    // host: '127.0.0.1',
    dialect: 'mysql',
  },
  test: {
    username: 'root',
    password: process.env.DB_PASSWORD,
    database: 'react-nodebird',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  production: {
    username: 'admin',
    password: process.env.DB_PASSWORD_PROD,
    database: 'react-nodebird',
    host: 'kdt9-test-justin.cwps8vphy3dm.ap-northeast-2.rds.amazonaws.com',
    dialect: 'mysql',
  },
};
