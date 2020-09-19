import React, { useEffect, useState } from 'react'
import DPMap from '../Map/DPMap'
import io from 'socket.io-client'

function DPHome () {
  
  const [address, setAddress] = useState({})
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [isAccepted, setIsAccepted] = useState(false)
  const [isPicked, setIsPicked] = useState(false)
  const [isDelivered, setIsDelivered] = useState(false)
  const [showMap, setShowMap] = useState(false)

  const socket = io('http://localhost:2809')

  socket.emit('new-dp-user', 'Delivery Partner')

  socket.on('dp-start-delivery', address => {
    console.log('ADDRESS R:', address)
    setAddress(address)
    setIsConfirmed(true)
  })

  const handleAccept = (e) => {
    e.preventDefault()
    setIsAccepted(true)
    socket.emit('delivery-partner-accepted', true)
    // btn1Ref.currentValue.visibility = 'visible'
  }
  const handleArrived = () => {
    socket.emit('dp-reached-store', true)
  }
  const handlePick = () => {
    setIsPicked(true)
    socket.emit('dp-picked-order', true)
  }
  const handleDeliver = () => {
    setIsDelivered(true)
    setShowMap(!showMap)
    socket.emit('delivery-done', true)
  }

  useEffect(() => {
    isAccepted && setShowMap(true)
  }, [isAccepted])

  return (
      <div className='login-container'>
        {!isConfirmed || isDelivered
          ? (
            <h3 className='dp-heading'>Delivery Partner Home Page</h3>
          )
          : (<>
            {!isDelivered && !showMap
              ? (<div>
                <p className='dp-heading'>Order Details</p>
                <p className='dp-div'>
                  <span className='dp-span-1'>Pickup Location: </span>
                  <span className='dp-span-2'>{address ? address.store : ''}</span>
                </p>
                <p className='dp-div'>
                  <span className='dp-span-1'>Drop Location: </span>
                  <span className='dp-span-2'> {address ? address.home : ''}</span>
                </p>
                <button className='login-button' type='submit' onClick={handleAccept}>
            ACCEPT ORDER
                </button>
              </div>)
              : ''}
          </>)}
        {isAccepted && !isDelivered && <div className='main-btn-div'>
            <div>
              <button onClick={handleArrived}>Arrived Store</button>
            </div>
            <div>
              <button onClick={handlePick}>Pick Order</button>
            </div>
            <div>
              <button onClick={handleDeliver}>Order Delivered</button>
            </div>
        </div>}
        <div className='dp-Map'>
          {isPicked && showMap && <DPMap store={address.store} home={address.home} />}
        </div>
      </div>
  )
}

export default DPHome
