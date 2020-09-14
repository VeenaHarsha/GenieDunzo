import React, { useState, useContext } from 'react'
import { AppContext } from '../../context/app/AppContext'
import io from 'socket.io-client'
import UserMap from '../Map/UserMap'

export default ({ deliveryAddress, orderRecieved }) => {
  const { storeAddress } = useContext(AppContext)

  const [orderAccepted, setOrderAccepted] = useState(false)
  const [partnerAssigned, setPartnerAssigned] = useState(false)
  const [partnerArrived, setPartnerArrived] = useState(false)
  const [orderPicked, setOrderPicked] = useState(false)
  const [orderDelivered, setOrderDelivered] = useState(false)
  const [showMap, setShowMap] = useState(false)

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

  return (
    <div className='track-container'>
      <div className='show-map show-map-info'>
        {orderDelivered && <div className='pay-container'>
          <p className='update-title' style={{textAlign:'center', fontSize:'20px'}}>Thank you for using Dunzo!!</p>
          </div>}
        {showMap && !orderDelivered && orderPicked &&
          <>
            <UserMap store={storeAddress} home={deliveryAddress} />
          </>}
      </div>
      <div className='show-updates'>
        <div className='updates-div'>
          {orderRecieved && <p className='update-title'>Order Recieved</p>}
        </div>
        <div>
          {orderAccepted && <p className='updates-div update-title'>Dunzo processing your Order</p>}
        </div>
        <div>
          {partnerAssigned && <p className='updates-div update-title'>Delivery Partner assigned</p>}
        </div>
        <div>
          {partnerArrived && <p className='updates-div update-title'>Delivery Partner arrived</p>}
        </div>
        <div>
          {orderPicked && <p className='updates-div update-title'>Order Pickedup</p>}
        </div>
        <div>
          {orderDelivered && <p className='updates-div update-title'>Delivered</p>}
        </div>
      </div>
    </div>
  )
}
