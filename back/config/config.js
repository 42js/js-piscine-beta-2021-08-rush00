require('dotenv').config({path : './config/.env'});
const env = process.env;

const development = {
    "username": env.MYSQL_DBUSER,
    "password": env.MYSQL_DBPASS,
    "database": env.MYSQL_DBNAME,
    "host": env.MYSQL_DBHOST,
    "dialect": env.MYSQL_DIALECT
 };

const production = {
    "username": env.MYSQL_DBUSER,
    "password": env.MYSQL_DBPASS,
    "database": env.MYSQL_DBNAME,
    "host": env.MYSQL_DBHOST,
    "dialect": env.MYSQL_DIALECT
};

module.exports = {development, production};
