const express = require('express')
const cors = require('cors')
require('dotenv').config()
const port = process.env.PORT || 2809
const app = express()
const routes = require('./util/routes')
app.use(cors())
app.use(express.json())

app.use('/dunzo', routes)


app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello World!' })
})

app.listen(port, () => {
  console.log('App running on :', port)
})
