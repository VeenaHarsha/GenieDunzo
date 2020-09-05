import React, { useState, useContext } from 'react'
import { AppContext } from '../../context/app/AppContext'
import io from 'socket.io-client'
import DunzoMap from '../Map/UserMap'

export default ({ deliveryAddress, orderRecieved }) => {
  const { storeAddress, addToDeliveries } = useContext(AppContext)

  const [orderAccepted, setOrderAccepted] = useState(false)
  const [partnerArrived, setPartnerArrived] = useState(false)
  const [orderPicked, setOrderPicked] = useState(false)
  const [orderDelivered, setOrderDelivered] = useState(false)
  const [showMap, setShowMap] = useState(false)

  const socket = io('http://192.168.0.104:2809')

  socket.on('outlet-accepted-order', data => {
    console.log('ORDER ACCEPTED:', data)
    setOrderAccepted(data)
  })

  socket.on('dp-connected', name => {
    console.log(`${name} is Connected`)
  })

  socket.on('waiting-for-dp', data => {
    setTimeout(setPartnerArrived(data), 2000)
  })

  socket.on('order-picked-up', data => {
    setOrderPicked(true)
    setShowMap(true)
  })
  socket.on('delivered', data => {
    setOrderDelivered(data)
  })
  return (
    <div className='track-container'>
      <div className='show-map show-map-info'>
        {orderDelivered && <div className='pay-container'><p className='update-title'>Thank you for using Dunzo!!</p></div>}
        {showMap && !orderDelivered &&
          <>
            <DunzoMap store={storeAddress} home={deliveryAddress} />
          </>}
      </div>
      <div className='show-updates'>
        <div className='updates-div'>
          {orderRecieved && <p className='update-title'>Order Recieved</p>}
        </div>
        <div className='updates-div'>
          {orderAccepted && <p className='update-title'>Outlet has accepted your Order</p>}
        </div>
        <div className='updates-div'>
          {partnerArrived && <p className='update-title'>Partner is on the way to outlet</p>}
        </div>
        <div className='updates-div'>
          {orderPicked && <p className='update-title'>Order Pickedup</p>}
        </div>
        <div className='updates-div'>
          {orderDelivered && <p className='update-title'>Delivered</p>}
        </div>
      </div>
    </div>
  )
}
