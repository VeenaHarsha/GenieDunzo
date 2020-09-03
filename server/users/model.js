const pool = require('../util/database')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const registerUser = async (req, res) => {
  console.log('AM INside REGISTER!!')
  const { username, email, password } = req.body
  try {
    const checkEmail = await pool.query(`SELECT id FROM tblusers WHERE email = '${email}'`)
    console.log('checking: ', checkEmail)
    if (checkEmail.rowCount > 0) {
      return res.status(400).json({ message: 'Email already exists.' })
    }
    const hashPwd = await bcrypt.hash(password, 10)

    const user = await pool.query(
      `INSERT INTO tblusers (username, email, password, deliverypartner)
       VALUES ('${username}', '${email}', '${hashPwd}', false) RETURNING *`
    )
  
    return res.status(201).json(user)
  } catch (err) {
    return res.status(400).json({ message: err.message })
  }
}

module.exports = { registerUser }