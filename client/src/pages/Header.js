import React, { useContext }  from 'react'
import { AppContext } from '../context/app/AppContext'

function Header () {
  const { cart } = useContext(AppContext)

  return (
    <div className='head-container'>
      <div className='head'>
        <img className='genie-image' src='/images/genie-2.png' alt='Genie' />
        <p className='app-name'>Genie</p>
        <p className='caption'>JUST A CLICK AWAY!</p>
      </div>
      <p className='user-name'>Hello! <strong>Veena</strong></p>
      <div>
        <img className='cart-image' src='/images/cart.png' alt='Kart' />
        <sub className='cart-counter'>{cart.length}</sub>
      </div>
    </div>
  )
}

export default Header
