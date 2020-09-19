import React, { useState } from 'react'
import io from 'socket.io-client'
import UserMap from '../Map/UserMap'
import { useHistory  } from 'react-router-dom'

export default ({ orderRecieved }) => {
  const [orderAccepted, setOrderAccepted] = useState(false)
  const [partnerAssigned, setPartnerAssigned] = useState(false)
  const [partnerArrived, setPartnerArrived] = useState(false)
  const [orderPicked, setOrderPicked] = useState(false)
  const [orderDelivered, setOrderDelivered] = useState(false)
  const [showMap, setShowMap] = useState(false)
  const history = useHistory()

  const socket = io('http://localhost:2809')

  socket.on('outlet-accepted-order', data => {
    console.log('ORDER ACCEPTED:', data)
    setOrderAccepted(data)
  })

  socket.on('dp-connected', name => {
    console.log(`${name} is Connected`)
  })

  socket.on('dp-assigned', data => {
    setPartnerAssigned(data)
  })

  socket.on('dp-arrived-store', data => {
    setPartnerArrived(data)
  })

  socket.on('order-picked-up', data => {
    setOrderPicked(data)
    setShowMap(true)
  })

  socket.on('delivered', data => {
    setOrderDelivered(data)
  })
  
  const handleBackHome = () => {
    history.push('/home')
  }

  return (
    <main className='track-container'>
      <aside className='show-map show-map-info'>
        {orderDelivered && <article className='checkout-page'>
          <p className='info-msg'>Thank you for using Dunzo!!</p>
          <button className='back-button' onClick={handleBackHome}> Back Home </button>
        </article>}
        {showMap && !orderDelivered && orderPicked &&
          <>
            <UserMap />
          </>}
      </aside>
      <aside className='show-updates'>
          {orderRecieved && <p className='updates-div update-title'>Order Recieved</p>}
          {orderAccepted && <p className='updates-div update-title'>Dunzo processing your Order</p>}
          {partnerAssigned && <p className='updates-div update-title'>Delivery Partner assigned</p>}
          {partnerArrived && <p className='updates-div update-title'>Delivery Partner arrived</p>}
          {orderPicked && <p className='updates-div update-title'>Order Pickedup</p>}
          {orderDelivered && <p className='updates-div update-title'>Delivered</p>}
      </aside>
    </main>
  )
}
