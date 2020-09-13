import React, { useState, useContext, useEffect } from 'react'
import '../../../node_modules/leaflet/dist/leaflet.css'
import '../../../node_modules/leaflet-routing-machine/dist/leaflet-routing-machine.css'
import 'leaflet-routing-machine'
import '../../../node_modules/leaflet-routing-machine/dist/leaflet.routing.icons.png'
import { AppContext } from '../../context/app/AppContext'
import { AuthContext } from '../../context/auth/AuthContext'
import { Redirect } from 'react-router-dom'
import TrackOrder from './TrackOrder'
import io from 'socket.io-client'

export default () => {
  const { storeAddress } = useContext(AppContext)
  const { isAuthenticated } = useContext(AuthContext)
  const [deliveryAddress, setDeliveryAddress] = useState('')
  const [isPaid, setIsPaid] = useState(false)
  const [orderRecieved, setOrderRecieved] = useState(false)
  const [showDelAddr, setShowDelAddr] = useState(false)

  const socket = io('http://localhost:2809')

  const submitAddress = (e) => {
    e.preventDefault()
    socket.emit('items-ordered', { store: storeAddress, home: deliveryAddress })
    setOrderRecieved(true)
  }
  const addAddress = (e) => {
    setDeliveryAddress(e.target.value)
  }

  const paymentDone = (e) => {
    setIsPaid(!isPaid)
  }
  const toggleShowAddress = () => {
    setShowDelAddr(!showDelAddr)
  }
  return (
    <>
      {!isAuthenticated
        ? (<Redirect to='/' />)
        : (
          <>
            {!orderRecieved &&
              <div className='checkout-page'>
                <div className='check-box'>
                  <input type='checkbox' id='ispaid' name='isPaid' onChange={paymentDone} />
                </div>
                <div className='pay-container'>
                  <p className='checkbox-title'>Select Payment Method </p>
                </div>
              </div>}
            {isPaid && !orderRecieved &&
              <div className='checkout-page'>
                <div className='check-box'>
                  <input type='checkbox' id='addrCheck' name='addrCheck' onChange={toggleShowAddress} />
                </div>
                <div className='address-container'>
                  <p className='checkbox-title'>Add Delivery Address </p>
                  {showDelAddr
                    ? (<form onSubmit={submitAddress}>
                      <input
                        className='input-addr-fromto'
                        id='delAddr'
                        type='text'
                        onChange={addAddress}
                        placeholder='Enter Delivery Address'
                        required
                    />
                    </form>) : ('')}
                </div>
              </div>}
            <>{orderRecieved && <TrackOrder orderRecieved={orderRecieved} deliveryAddress={deliveryAddress} />}</>
          </>
        )}
    </>
  )
}
