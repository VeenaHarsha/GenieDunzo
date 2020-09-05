const express = require('express')
const app = express()
const routes = require('./util/routes')
const cors = require('cors')

require('dotenv').config()
const port = process.env.PORT || 2809

app.use(cors())
app.use(express.json())
app.use('/dunzo', routes)

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello World!' })
})

// sockets

const http = require('http')
const server = http.createServer(app)
const io = require('socket.io')(server, {
  handlePreflightRequest: (req, res) => {
    const headers = {
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    }
    res.writeHead(200, headers)
    res.end()
  }
})

io.on('connection', socket => {
  console.log('CONNECTED..')
  socket.on('new-dp-user', name => {
    socket.broadcast.emit('dp-connected', name)
  })
  socket.broadcast.emit('outlet-accepted-order', true)

  socket.on('items-ordered', address => {
    socket.broadcast.emit('start-delivery', address)
  })

  socket.broadcast.emit('waiting-for-dp', true)

  socket.on('send-address', data => {
    socket.broadcast.emit('send-geocode-addr', data)
  })

  // socket.on('send-waypoints', data => {
  //   socket.broadcast.emit('update-user-map-route', data)
  // })

  socket.on('delivery-partner-accepted', data => {
    socket.broadcast.emit('order-picked-up', data)
  })

  socket.on('new-dp-position', data => {
    socket.broadcast.emit('locate-new-dp-pos', data)
  })

  socket.on('delivery-done', data => {
    socket.broadcast.emit('delivered', data)
  })
})

server.listen(port, () => {
  console.log('App running on :', port)
})

// https://developer.here.com/blog/real-time-interaction-between-maps-with-socket.io-and-javascript
// https://stackoverflow.com/questions/48075509/socket-io-failed-websocket-is-closed-before-the-connection-is-established

// failed: WebSocket is closed before the connection is established.

// https://stackoverflow.com/questions/48075509/socket-io-failed-websocket-is-closed-before-the-connection-is-established
