const express = require('express')
const app = express()
const routes = require('./util/routes')
const cors = require('cors')
require('dotenv').config()
const port = process.env.PORT || 2809

app.use(cors())
app.use(express.json())
app.use('/dunzo', routes)

// sockets
const http = require('http')
const server = http.createServer(app)
// const io = require('socket.io')(server)

const io = require('socket.io')(server, {
  handlePreflightRequest: (req, res) => {
      const headers = {
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true
      }
      res.writeHead(200, headers)
      res.end()
  }})

server.listen(port, () => {
    console.log('App running on :', port)
  })

io.sockets.on('connection', socket => {
  socket.on('new-dp-user', name => {
    socket.broadcast.emit('dp-connected', name)
    const myFunc = (flag) => {
      socket.broadcast.emit('outlet-accepted-order', flag)
    }
    setTimeout(myFunc, 2000, true);
  })
  
  socket.on('items-ordered', address => {
    socket.broadcast.emit('dp-start-delivery', address)
  })

  socket.on('delivery-partner-accepted', data => {
    socket.broadcast.emit('dp-assigned', data)
  })

  socket.on('dp-reached-store', data => {
    socket.broadcast.emit('dp-arrived-store', data)
  })

  socket.on('dp-picked-order', data => {
    socket.broadcast.emit('order-picked-up', data)
  })

  socket.on('send-address', data => {
    socket.broadcast.emit('send-geocode-addr', data)
  })

  socket.on('new-dp-position', data => {
    socket.broadcast.emit('locate-new-dp-pos', data)
  })

  socket.on('delivery-done', data => {
    socket.broadcast.emit('delivered', data)
  })
})
