const { Pool } = require("pg");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../../.env") });

const devConfig = {
  user: process.env.REACT_APP_DB_USER,
  password: process.env.REACT_APP_DB_PWD,
  host: process.env.REACT_APP_HOST,
  database: process.env.REACT_APP_DATABASE,
  port: process.env.DB_PORT,
  ssl: true,
};
const prodConfig = {
  connectionString: process.env.DATABASE_URL,
};

const pool = new Pool(
  process.env.NODE_ENV === "production" ? prodConfig : devConfig
);

const query = async (sql, params) => {
  try {
    return await pool.query(sql, params);
  } catch (err) {
    console.log("ERROR:", err);
  }
};

module.exports = { query };
