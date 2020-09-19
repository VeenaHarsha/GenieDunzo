import React, { useContext, useEffect } from 'react'
import { AppContext } from '../../context/app/AppContext'
import { AuthContext } from '../../context/auth/AuthContext'

export default ({selStoreId}) => {
  const { cart, getCartList } = useContext(AppContext)
  const { user } = useContext(AuthContext)

  // useEffect(() => {
  //   console.log('Getting CartList:', selStoreId, user.id)
  //  getCartList(selStoreId, user.id)
  // }, [selStoreId, user.id])

  return (
    <article className='cart-container'>
      {cart.length ? cart.map((cartItem, index) => (
        <CartItems key={index} cartItem={cartItem} />
      )) : ''}
    </article>
  )
}

function CartItems ({ cartItem }) {
  return (
    <aside className='cart-items'>
      <data className='cart-item'>{cartItem.itemname}</data>
      <data className='cart-item'>{cartItem.price}</data>
      <data className='cart-item'>{cartItem.quantity}</data>
      <data className='cart-item'>{cartItem.itemtotal}</data>
    </aside>
  )
}
