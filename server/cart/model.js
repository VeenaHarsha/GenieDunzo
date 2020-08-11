const pool = require('../util/database')

const getCartList = async (req, res) => {
  const { storeId } = req.params
  console.log('gEtCART:', storeId)
  try {
    const result = await pool.query(`SELECT c.id, c.itemname,c.price, c.quantity, c.itemtotal FROM Cart c WHERE  c.storeId = ${storeId} ORDER BY ID `)
    console.log('Hey i got these: ', result.rows)
    res.status(200).json(result.rows)
  } catch (err) {
    return res.status(500).json({ message: 'Error..' })
  }
}

const addCart = async (req, res) => {
  const { storeid, itemid, itemname, quantity, price } = req.body
  const itemTotal = (price * quantity)
  try {
    const query = `INSERT INTO Cart (storeid,itemid,itemname,quantity,price,itemtotal) 
                     VALUES (${storeid},${itemid},'${itemname}',${quantity},${price}, ${itemTotal}) RETURNING *`
    const result = await pool.query(query)
    console.log('Cart Entry:', result)
    res.status(201).json(result.rows)
  } catch (err) {
    return res.status(500).json({ message: 'Error..' })
  }
}
const updateCart = async (req, res) => {
  const { quantity, price } = req.body
  console.log('updateCart REQUEST is:', req.params.id)
  const itemTotal = (price * quantity)
  try {
    const query = `UPDATE Cart SET quantity = ${quantity}, itemtotal = ${itemTotal} WHERE id = ${req.params.id}  RETURNING *`
    const result = await pool.query(query)
    console.log('Update Cart result:', result)
    res.status(200).json(result.rows)
  } catch (err) {
    return res.status(500).json({ message: 'Error..' })
  }
}
const deleteCart = async (req, res) => {
  const { storeid, cartitem } = req.query
  try {
    const query = `DELETE from cart WHERE itemid = ${cartitem} and storeid = ${storeid} `
    res.status(200).json({ message: 'Cart Item Deleted', cartitem: cartitem })
  } catch (err) {
    return res.status(500).json({ message: 'Error..' })
  }
}

module.exports = { addCart, updateCart, getCartList, deleteCart }
