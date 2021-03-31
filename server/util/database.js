const { Pool } = require('pg')

const pool = new Pool({
  user: 'postgres',
  password: 'qwerty',
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
