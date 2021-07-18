const Pool = require("pg").Pool;
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const devconfig = {
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DATABASE,
};

const pool = new Pool(devconfig);

module.exports = pool;
