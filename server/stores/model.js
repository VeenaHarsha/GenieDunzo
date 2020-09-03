const pool = require('../util/database')

const getStores = async (req, res) => {
  const { catId } = req.params
  const result = await pool.query(`SELECT * FROM stores WHERE id in (SELECT storeid FROM storecategories WHERE ${catId} = ANY(catId) ) ORDER BY ID `)
  res.status(200).json(result.rows)
}


const getStoreCategories = async (req, res) => {
  const { storeId } = req.params
  const result = await pool.query(`SELECT * FROM categories WHERE id in (SELECT unnest(catid) FROM storecategories WHERE storeid = ${storeId} ) ORDER BY ID `)
  res.status(200).json(result.rows)
}

module.exports = { getStores, getStoreCategories }
