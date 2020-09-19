import React, { useState, useEffect, useContext } from 'react'
import { AppContext } from '../../context/app/AppContext'
import { AuthContext } from '../../context/auth/AuthContext'

function Item ({ item,cart, selStoreId, handleUpdateItem, handleAddItem, handleRemoveItem }) {
  const { getCartList } = useContext(AppContext)
  const { user } = useContext(AuthContext)

  const initialQuantity = () => {
    const qty = cart.filter(cItem => cItem.itemid === item.id && cItem.userid === user.id )
    // let q = 0 || (qty.length ? qty[0].quantity : 0)
    return (qty.length ? qty[0].quantity : 0)
  }
  const [showIncrDecr, setShowIncrDecr] = useState(false)
  const [quantity, setQuantity] = useState(initialQuantity)

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
    handleRemoveItem(item.id)
  }

  const onItemUpdate = async (event) => {
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
  const getQtyInfo = async () => {
    await getCartList(selStoreId, user.id)
    await setQuantity(initialQuantity)
  }

  useEffect(() => {
    getQtyInfo()
    if (quantity > 0) {
      handleUpdateItem(item, quantity)
      setShowIncrDecr((quantity > 0))
    }
  }, [quantity])

  return (
    <article key={item.id} className='item-div'>
      <figure className='item-list-div'>
          <img width='100px' height='100px' className='item-img-div store-image' src='/images/store-img.jpg' alt='Item' />
          <figcaption className='item-name-price-qty-div'>
            <span className='item-name'>{item.itemname}</span>
            <span className='item-price'>₹{item.price}</span>
            <span className='item-price'>1 kg</span>
          </figcaption>

        <data className='price-div'>
          {!showIncrDecr && <button name='incr' className='incr-decr' onClick={(e) => onAddItem(e, item, 1)}>+ ADD</button>}
          {showIncrDecr &&
          <>
            <button className='incr-decr' name='incr' onClick={onItemUpdate}>+</button>
            <span className='qty-value'>{quantity}</span>
            <button className='incr-decr' name='decr' onClick={onItemUpdate}>-</button>
          </>}
        </data>
      </figure>
    </article>
  )
}
export default Item
