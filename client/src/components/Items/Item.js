import React, { useState, useEffect, useContext } from 'react'
import { AppContext } from '../../context/app/AppContext'
import { AuthContext } from '../../context/auth/AuthContext'

function Item ({ item, selStoreId, handleUpdateItem, handleAddItem, removeFromCart }) {
  const { cart, getCartList } = useContext(AppContext)
  const { user } = useContext(AuthContext)
  const qty = cart.filter(cItem => cItem.itemid === item.id && cItem.userid === user.id)
  let q = 0 || (qty.length ? qty[0].quantity : 0)
  const [showIncrDecr, setShowIncrDecr] = useState(false)
  const [quantity, setQuantity] = useState(q)

  const onAddItem = (event, item, quantity) => {
    event.preventDefault()
    setQuantity(prevQty => prevQty + 1)
    setShowIncrDecr(true)
    handleAddItem(item, quantity)
  }

  const incrementValue = () => {
    setQuantity(prevQty => prevQty  + 1)
  }

  const decrementValue = () => {
    setQuantity(prevQty => prevQty - 1)
  }

  const backToAddBtn = async () => {
    setQuantity(prevQty => prevQty - 1)
    setShowIncrDecr(false)
    removeFromCart(item.id)
  }

  const onItemUpdate = async (event, item) => {
    if (event.target.name === 'decr') {
      if (quantity === 1) {
        backToAddBtn()
      } else {
        decrementValue()
      }
    } else {
      incrementValue()
      setShowIncrDecr(true)
    }
    //  handleUpdateItem(item, quantity)
  }

  useEffect(() => {
    q = cart.filter(cItem => cItem.itemid === item.id && cItem.userid === user.id)
    setShowIncrDecr((quantity > 0))
  }, [])

  useEffect(() => {
    getCartList(selStoreId, user.id)
    if (quantity > 0) {
      handleUpdateItem(item, quantity)
      setShowIncrDecr((quantity > 0))
    }
  }, [quantity])

  return (
    <>
      <div key={item.id} className='item-div'>
        <div className='item-list-div'>
          <div className='item-img-div'>
            <img width='100px' height='100px' className='store-image' src='/images/store-img.jpg' alt='Item' />
          </div>
          <div className='item-name-price-qty-div'>
            <span className='item-name'>{item.itemname}</span>
            <span className='item-price'>₹{item.price}</span>
            <span className='item-price'>1 kg</span>
          </div>

          <div className='price-div'>
            {!showIncrDecr && <button name='incr' className='incr-decr' onClick={(e) => onAddItem(e, item, 1)}>+ ADD</button>}
            {showIncrDecr &&
            <>
              <button className='incr-decr' name='incr' onClick={(e) => onItemUpdate(e, item)}>+</button>
              <span className='qty-value'>{quantity}</span>
              <button className='incr-decr' name='decr' onClick={(e) => onItemUpdate(e, item)}>-</button>
            </>}
          </div>
        </div>
      </div>
    </>
  )
}
export default Item
