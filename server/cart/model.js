const pool = require('../util/database')

const getCartList = async (req, res) => {
  const { storeid, userid } = req.query
  try {
    const result = await pool.query(`SELECT * FROM cart WHERE  storeId = ${storeid} and userid= ${userid} ORDER BY ID `)
    res.status(200).json(result.rows)
  } catch (err) {
    return res.status(500).json({ message: 'Error..' })
  }
}

const addCart = async (req, res) => {
  const { userid, storeid, itemid, itemname, quantity, price } = req.body
  const itemTotal = (price * quantity)
  try {
    const query = `INSERT INTO Cart (userid,storeid,itemid,itemname,quantity,price,itemtotal) 
                     VALUES (${userid},${storeid},${itemid},'${itemname}',${quantity},${price}, ${itemTotal}) RETURNING *`
    const result = await pool.query(query)
    res.status(201).json(result.rows)
  } catch (err) {
    return res.status(500).json({ message: 'Error..' })
  }
}
const updateCart = async (req, res) => {
  const { quantity, price } = req.body
  const itemTotal = (price * quantity)
  try {
    const query = `UPDATE Cart SET quantity = ${quantity}, itemtotal = ${itemTotal} WHERE id = ${req.params.id}  RETURNING *`
    const result = await pool.query(query)
    res.status(200).json(result.rows)
  } catch (err) {
    return res.status(500).json({ message: 'Error..' })
  }
}
const deleteCart = async (req, res) => {
  const { storeid, cartitem } = req.query
  try {
    const query = `DELETE from cart WHERE itemid = ${cartitem} and storeid = ${storeid} `
    await pool.query(query)
    res.status(200).json({ message: 'Cart Item Deleted', cartitem: cartitem })
  } catch (err) {
    return res.status(500).json({ message: 'Error..' })
  }
}
const deleteAllCart = async (req, res) => {
  const { storeId } = req.params
  try {
    const query = `DELETE from cart WHERE storeId = ${storeId} `
    await pool.query(query)
    res.status(200).json({ message: 'Cart is empty!!', cart: []})
  } catch (err) {
    return res.status(500).json({ message: 'Error..' })
  }
}
module.exports = { addCart, updateCart, getCartList, deleteCart, deleteAllCart }
