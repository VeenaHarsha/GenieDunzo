import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/app/AppContext'
import {Link} from 'react-router-dom'

export default () => {
  const { cart, getCartList } = useContext(AppContext)
  const cartTotalAmt = cart.map(item => +item.itemtotal).reduce((a,b) => a+b , 0)

  useEffect(() => {
    getCartList()
  }, [])
  
  return (
    <>
      <div className='cart-header'>
        <p className='cart-header'>ItemName</p>
        <p className='cart-header'>Price</p>
        <p className='cart-header'>Quantity</p>
        <p className='cart-header'>Item Total</p>
      </div>
      {cart.map(cItem => (
        <div key={cItem.id} className='cart-items'>
          <div className='cart-item-name'>{cItem.itemname}</div>
          <p className='cart-item-name'>{cItem.price}</p>
          <p className='cart-item-name'>{cItem.quantity}</p>
          <p className='cart-item-name'>{cItem.itemtotal}</p>
        </div>
      ))}
      <div className='cart-total'>
      {cart.length ? <><span>Total Amount: Rs. {cartTotalAmt}</span></> : <span>Cart is Empty!!</span>}
      
      </div>
      <Link to={`/address`}>
        {cartTotalAmt > 0 &&
        <div className='checkout-box'>
          <input type='button' value='Proceed To Checkout' className='proceed-box' />
        </div>}
      </Link>
    </>
  )
}
