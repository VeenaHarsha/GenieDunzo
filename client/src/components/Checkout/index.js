import React, { useState, useContext} from 'react'
import '../../../node_modules/leaflet/dist/leaflet.css'
import '../../../node_modules/leaflet-routing-machine/dist/leaflet-routing-machine.css'
import 'leaflet-routing-machine'
import '../../../node_modules/leaflet-routing-machine/dist/leaflet.routing.icons.png'
import { AppContext } from '../../context/app/AppContext'
import TrackOrder from './TrackOrder'
import io from 'socket.io-client'

export default () => {
  const { storeAddress } = useContext(AppContext)
  const [isPaid, setIsPaid] = useState(false)
  const [orderRecieved, setOrderRecieved] = useState(false)
  const [showDelAddr, setShowDelAddr] = useState(false)

  const socket = io('http://localhost:2809')

  const submitAddress = (e) => {
    e.preventDefault()
    const deliveryAddress = e.target.elements.delAddrInput.value
    socket.emit('items-ordered', { store: storeAddress, home: deliveryAddress })
    setOrderRecieved(true)
  }

  const paymentDone = (e) => {
    setIsPaid(!isPaid)
  }
  const toggleShowAddress = () => {
    setShowDelAddr(!showDelAddr)
  }
  return (
    <section>
      {!orderRecieved &&
        <article className='checkout-page'>
          <input className='check-box' type='checkbox' id='ispaid' name='isPaid' onChange={paymentDone} />
          <label className='checkbox-title' htmlFor='ispaid'>Select Payment Method </label>
        </article>}
      {isPaid && !orderRecieved &&
        <article className='checkout-page'>
          <input className='check-box' type='checkbox' id='addrCheck' name='addrCheck' onChange={toggleShowAddress} />
            <label className='checkbox-title' htmlFor='addrCheck'>Add Delivery Address </label>
            {showDelAddr
              ? (<form className='address-container' onSubmit={submitAddress}>
                <input
                  className='input-addr-fromto'
                  id='delAddrInput'
                  type='text'
                  placeholder='Enter Delivery Address'
                  required
              />
              </form>) : ('')}
        </article>}
      <article>{orderRecieved && <TrackOrder orderRecieved={orderRecieved} />}</article>
    </section>
  )
}
