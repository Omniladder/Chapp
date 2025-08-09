require('dotenv').config({ path: '../.env'});

console.log("DB_USER ", process.env.DB_USER);
console.log("DB_PASS ", process.env.DB_PASSWORD);
console.log("DB_NAME ", process.env.DB_NAME);
console.log("DB_HOST ", process.env.DB_HOST);

// Simply creates config file
module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres'
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME_TEST,
    host: process.env.DB_HOST,
    dialect: 'postgres'
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME_PROD,
    host: process.env.DB_HOST,
    dialect: 'postgres'
  }
};



