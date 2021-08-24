require('dotenv').config();

const { env } = process;

const development = {
  username: env.MYSQL_USERNAME,
  password: env.MYSQL_PASSWORD,
  database: env.MYSQL_DATABASE,
  host: env.MYSQL_HOST,
  dialect: env.MYSQL_DIALECT,
  port: env.MYSQL_PORT,
  secretKey: env.SECRET_KEY,
  expiresIn: env.EXPIRES_IN,
};

const production = {
  username: env.MYSQL_USERNAME,
  password: env.MYSQL_PASSWORD,
  database: env.MYSQL_DATABASE,
  host: env.MYSQL_HOST,
  dialect: env.MYSQL_DIALECT,
  port: env.MYSQL_PORT,
  secretKey: env.SECRET_KEY,
  expiresIn: env.EXPIRES_IN,
};

const test = {
  username: env.MYSQL_USERNAME,
  password: env.MYSQL_PASSWORD,
  database: env.MYSQL_DATABASE_TEST,
  host: env.MYSQL_HOST,
  dialect: env.MYSQL_DIALECT,
  port: env.MYSQL_PORT,
  secretKey: env.SECRET_KEY,
  expiresIn: env.EXPIRES_IN,
};

module.exports = { development, production, test };
