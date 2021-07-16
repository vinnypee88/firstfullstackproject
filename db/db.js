const Pool = require("pg").Pool;

const devconfig = {
  user: "postgres",
  password: "",
  host: "localhost",
  port: 5432,
  database: "summer",
};

const pool = new Pool(devconfig);

module.exports = pool;
