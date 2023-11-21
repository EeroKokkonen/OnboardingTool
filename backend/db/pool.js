const mysql = require("mysql2");
require("dotenv").config();

// TODO: Lisää muuttujat env tiedostoon
// Ei vielä testattu, luulisi kuitenkin toimivan
const pool = mysql.createPool({
  host: 'localhost',
  user: "root",
  password: "mysql",
  database: "OnboardingToolDB",
});

module.exports = pool;
