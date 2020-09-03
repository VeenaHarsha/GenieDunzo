const pool = require('../util/database')

const getCategories = async (req, res) => {
  try{
    const result = await pool.query('SELECT * FROM categories ORDER BY ID ASC')
    res.status(200).json(result.rows)
  } catch (err) {
    return res.status(500).json({ message: 'Error..' })
  }
}
const getDeliveries = async (req, res) => {
  try{
    const result = await pool.query('SELECT * FROM tblDelivery ORDER BY ID ASC')
    res.status(200).json(result.rows)
  } catch (err) {
    return res.status(500).json({ message: 'Error..' })
  }
}
const addToDeliveries  = async (req, res) => {
  const {storeAddress, deliveryAddress} = req.body
  try {
    const query = `INSERT INTO tbldelivery (storeAddress, deliveryAddress) 
                   VALUES ( '${storeAddress}', '${deliveryAddress}' )
                   RETURNING *`
    const result = await pool.query(query)
    res.status(201).json(result.rows)
  } catch (err) {
    return res.status(500).json({ message: 'Error..' })
  }
}
const deleteDeliveries = async (req, res) => {
  const { storeId } = req.params
  try {
    const query = ' DELETE from tbldelivery'
    await pool.query(query)
    res.status(200).json({ message: 'Delivery Done!!'})
  } catch (err) {
    return res.status(500).json({ message: 'Error..' })
  }
}

module.exports = { getCategories, getDeliveries, addToDeliveries,deleteDeliveries }
