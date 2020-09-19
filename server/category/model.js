const pool = require('../util/database')

const getCategories = async (req, res) => {
  try{
    const result = await pool.query('SELECT * FROM categories ORDER BY ID ASC')
    res.status(200).json(result.rows)
  } catch (err) {
    return res.status(500).json({ message: 'Error..' })
  }
}

module.exports = { getCategories }
