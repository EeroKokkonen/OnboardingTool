const mysql = require("mysql2");
require("dotenv").config();

const pool = mysql.createPool({
  host: 'localhost',
  user: "root",
  password: "mysql",
  database: "OnboardingToolDB",
});

module.exports = pool;
