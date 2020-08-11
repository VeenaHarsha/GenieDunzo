const pool = require('../util/database')

const getAllItems = async(req, res) => {
  const { catId } = req.params
  const result = await pool.query(`SELECT * FROM items WHERE catid = ${catId} ORDER BY ID `)
  res.status(200).json(result.rows)
}
const getItems = async (req, res) => {
  const { storeid, catid } = req.query
  const result = await pool.query(`SELECT * FROM items WHERE catid = ${catid} and ${storeid} = ANY(storeid) ORDER BY ID `)
  res.status(200).json(result.rows)
}

module.exports = { getAllItems, getItems }
