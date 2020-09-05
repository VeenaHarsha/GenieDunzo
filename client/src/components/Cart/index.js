import React, { useContext, useEffect } from 'react'
import { AppContext } from '../../context/app/AppContext'
import { AuthContext } from '../../context/auth/AuthContext'

export default () => {
  const { cart, getCartList, selStoreId } = useContext(AppContext)
  const { user } = useContext(AuthContext)

  useEffect(() => {
    getCartList(selStoreId, user.id)
  }, [])

  return (
    <div className='cart-container'>
      {cart.length && cart.map((cartItem, index) => (
        <CartItems key={index} cartItem={cartItem}/>
      ))}
     
    </div>
  )
}

function CartItems ({ cartItem }) {
  return (
    <div className='cart-items'>
      <p className='cart-item-name'>{cartItem.itemname}</p>
      <p className='cart-item-name'>{cartItem.price}</p>
      <p className='cart-item-name'>{cartItem.quantity}</p>
      <p className='cart-item-name'>{cartItem.itemtotal}</p>
    </div>
  )
}
