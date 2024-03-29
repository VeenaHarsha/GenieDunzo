const pool = require("../util/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const getUserDetails = async (req, res) => {
  try {
    const checkUser = await pool.query(
      `SELECT id, username, deliverypartner FROM tblusers WHERE id = ${req.user}`
    );
    if (!checkUser.rowCount)
      return res.status(400).json({ message: "User not found" });
    return res.status(200).json(checkUser.rows[0]);
  } catch (err) {
    return res.status(500).json({ message: "Server Error" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log("UN & PWD:", req.body);
  try {
    const user = await pool.query(
      `SELECT id, username, password, deliverypartner FROM tblusers WHERE email = '${email}'`
    );
    console.log("LOGGED IN USER IS:", user);
    if (!user.rowCount) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    const pwd = await bcrypt.compare(password, user.rows[0].password);
    console.log("LOGGED IN USER IS:", password, user.rows[0].password);

    // if (!pwd) return res.status(400).json({ message: "Invalid Credentials" });
    const token = jwt.sign({ user: user.rows[0].id }, "" + process.env.SECRET, {
      expiresIn: "2 days",
    });
    console.log("Token IS:", token);
    res.status(200).json({
      token,
      user: {
        id: user.rows[0].id,
        name: user.rows[0].username,
        email: user.rows[0].email,
        deliverypartner: user.rows[0].deliverypartner,
      },
    });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

module.exports = { getUserDetails, loginUser };
