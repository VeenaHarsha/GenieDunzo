const { Pool } = require('pg')

const pool = new Pool({
  user: 'postgres',
  password: 'password123',
  host: 'localhost',
  database: 'dunzo',
  port: 5432
})
const query = async (sql, params) => {
  try {
    return await pool.query(sql, params)
  } catch (err) {
    console.log('ERROR:', err)
  }
}
module.exports = { query }
