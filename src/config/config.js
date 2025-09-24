require('dotenv').config({ path: './.env'});

console.log("DB_USER ", process.env.POSTGRES_USER);
console.log("DB_PASS ", process.env.POSTGRES_PASSWORD);
console.log("DB_NAME ", process.env.POSTGRES_DB);
console.log("DB_HOST ", process.env.POSTGRES_HOST);

// Simply creates config file
module.exports = {
  development: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
    dialect: 'postgres'
  },
  test: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
    dialect: 'postgres'
  },
  production: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
    dialect: 'postgres'
  }
};



