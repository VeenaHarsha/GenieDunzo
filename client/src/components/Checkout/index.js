import React, { useState, useContext, useEffect } from 'react'
import DunzoMap from '../Pages/DunzoMap'
import '../../../node_modules/leaflet/dist/leaflet.css'
import '../../../node_modules/leaflet-routing-machine/dist/leaflet-routing-machine.css'
import 'leaflet-routing-machine'
import '../../../node_modules/leaflet-routing-machine/dist/leaflet.routing.icons.png'
import { AppContext } from '../../context/app/AppContext'
import { AuthContext } from '../../context/auth/AuthContext'
import { Redirect } from 'react-router-dom'
import io from 'socket.io-client'

export default () => {
  const [showMap, setShowMap] = useState(false)
  const { storeAddress, addToDeliveries} = useContext(AppContext)
  const { isAuthenticated } = useContext(AuthContext)
  const [deliveryAddress, setDeliveryAddress] = useState('')
  const [isAccepted, setIsAccepted] = useState(false)
  const [isDelivered, setIsDelivered] = useState(false)
  const [isPaid, setIsPaid] = useState(false)
  const [readyToDeliver, setReadyToDeliver] = useState(false)
  
  const socket = io('http://192.168.0.104:2809')

  socket.on('dp-connected', name => {
    console.log(`${name} is Connected`)
  })
  
  const submitAddress = (e) => {
    e.preventDefault()
    console.log('VASISTA:',storeAddress,deliveryAddress,socket)
    socket.emit('cart-ready-for-delivery', {store: storeAddress, home: deliveryAddress})
    setReadyToDeliver(true)

    socket.on('accept-delivery', data => {
      console.log('Delivery Partner Accepted!', data)
      setIsAccepted(data)
    })
    setShowMap(true) 
  }
  const addAddress = (e) => {
    setDeliveryAddress(e.target.value)
  }

  useEffect(() => {
    isAccepted ? setShowMap(true) : setShowMap(false)
  }, [isAccepted])

  useEffect(() => {
    socket.on('delivered', data => {
      console.log('Delivery DONE!', data)
      setIsDelivered(data)
    })
  }, [isDelivered])
  
  const paymentDone = (e) => {
    setIsPaid(!isPaid)
  }
  return (
    <>
      {!isAuthenticated
        ? (<Redirect to='/' />)
        : (
          <>
        <div className='checkout-page'>
            <form onSubmit={submitAddress}>
                <div className='pay-container'>
                  <label className='paid' htmlFor='ispaid'>Is Payment Done </label>
                  <input type='checkbox' id='ispaid' name='isPaid' onChange={paymentDone} />
                </div>
                <div className='pay-container'>
                  <input
                    className='input-addr-fromto'
                    type='text'
                    onChange={addAddress}
                    placeholder='Enter Delivery Address'
                    required
                  />
                </div>
                <button type='submit' >Go</button>
            </form>
      </div>
      {isAccepted && showMap && 
       (<div className='show-map-info'>
          <div className='map'>
             (<DunzoMap store={storeAddress} home={deliveryAddress} />
          </div>
          <div className='checklist'>
              <div>
                <label className='paid' htmlFor='readyToDeliver'>Cart Ready To Deliver</label>
                <input type='checkbox' id='readyToDeliver' name='readyToDeliver' checked={readyToDeliver} /> 
              </div>
              <div>
                <label className='paid' htmlFor='isAccepted'>Delivery Partner Accepted </label>
                <input type='checkbox' id='isAccepted' name='isAccepted' checked={isAccepted}/> 
              </div>
              <div>
                <label className='paid' htmlFor='isDelivered'>Items Delivered </label>
                <input type='checkbox' id='isDelivered' name='isDelivered' checked={isDelivered} /> 
              </div>
          </div>
        </div>)}
        </>)}
    </>
  )
}

{/*
<div className='show-map-info'>
        <h1>A:{storeAddress} - {deliveryAddress}</h1>
          <div className='map'>
             { !isDelivered ? (<DunzoMap store={storeAddress} home={deliveryAddress} />) 
             : <h2 className='dp-name'>Items Delivered</h2> }
          </div>
          <div className='checklist'>
            <div>
              <label className='paid' htmlFor='cartReady'>Cart Ready To Deliver</label>
              {/* <input type='checkbox' id='cartReady' name='cartReady' /> 
              </div>
              <div>
                <label className='paid' htmlFor='isAccepted'>Delivery Partner Accepted </label>
                {/* <input type='checkbox' id='isAccepted' name='isAccepted' /> 
              </div>
              <div>
                <label className='paid' htmlFor='isDelivered'>Items Delivered </label>
                {/* <input type='checkbox' id='isDelivered' name='isDelivered' /> 
              </div>
          </div>
            </div>
*/}