import React, { useEffect, useState } from 'react'
import DPMap from '../Map/DPMap'
import io from 'socket.io-client'

function DPHome () {
  const [address, setAddress] = useState({})
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [isAccepted, setIsAccepted] = useState(false)
  const [isDelivered, setIsDelivered] = useState(false)
  const [showMap, setShowMap] = useState(false)

  const socket = io('http://192.168.0.104:2809')

  socket.emit('new-dp-user', 'Delivery Partner')

  socket.on('start-delivery', address => {
    console.log('ADDRESS R:', address)
    setAddress(address)
    setIsConfirmed(true)
  })

  const handleClick = (e) => {
    e.preventDefault()
    setIsAccepted(true)
    socket.emit('delivery-partner-accepted', true)
  }

  const isDeliveryDone = () => {
    setIsDelivered(true)
    setShowMap(!showMap)
    socket.emit('delivery-done', true)
  }

  useEffect(() => {
    isAccepted && setShowMap(true)
  }, [isAccepted])

  return (
    <>
      <div className='login-container'>
        {!isConfirmed || isDelivered
          ? (
            <>
              <h3 className='dp-heading'>Delivery Partner Home Page</h3>
            </>
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
                <button className='proceed-box' type='submit' onClick={handleClick}>
            ACCEPT
                </button>
              </div>)
              : ''}
          </>)}
        <div>
          {showMap && <label className='dp-isDel' htmlFor='isDelivered'>Is Delivered:
            <input type='checkbox' id='isDelivered' name='isDelivered' value={isDelivered} onChange={isDeliveryDone} />
          </label>}
        </div>
        <div className='dp-Map'>
          {showMap && <DPMap store={address.store} home={address.home} />}
        </div>
      </div>
    </>
  )
}

export default DPHome
