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
const server = http.createServer(app);
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
// io.origins('*:*')
io.on('connection', socket => {
  console.log('CONNECTED..')
  socket.on('new-dp-user', name => {
    socket.broadcast.emit('dp-connected', name)
  })
  socket.on('cart-ready-for-delivery', address => {
    console.log('ADDRESSES: ', address)
    socket.broadcast.emit('start-delivery', address)
  })

  socket.on('delivery-partner-accepted', data => {
    socket.broadcast.emit('accept-delivery', data)
  })
  
  socket.on('delivery-done', data => {
    socket.broadcast.emit('delivered', data)
  })

})

server.listen(port, () => {
  console.log('App running on :', port)
})


//https://developer.here.com/blog/real-time-interaction-between-maps-with-socket.io-and-javascript
//https://stackoverflow.com/questions/48075509/socket-io-failed-websocket-is-closed-before-the-connection-is-established

//failed: WebSocket is closed before the connection is established.

//https://stackoverflow.com/questions/48075509/socket-io-failed-websocket-is-closed-before-the-connection-is-established