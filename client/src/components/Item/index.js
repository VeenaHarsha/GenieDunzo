import React, { useState, useEffect } from 'react'

export default ({ item, handleUpdateItem, handleAddItem, removeFromCart }) => {
  const [quantity, setQuantity]= useState(0)
  const [showIncrDecr, setShowIncrDecr]= useState(false)
  
  const incrementValue =  () => {
    setQuantity(quantity + 1)
  }
  
  const decrementValue = () => {
      setQuantity(quantity - 1)
  }

  const backToAddBtn = async () => {
    await setQuantity(0)
    setShowIncrDecr(false)
    removeFromCart(item.id)
    return
  }
  
  const onItemUpdate = async(event, item) => {
    if(event.target.name === 'decr') {
      if(quantity === 1 ){
        backToAddBtn()
      }else{
        decrementValue()
      }
    } else {
      incrementValue()
    }
    setShowIncrDecr(true)
    // handleUpdateItem(item, quantity)
  }

  const onAddItem =(event,item, quantity) => {
    event.preventDefault()
    setQuantity(quantity => quantity + 1)
    setShowIncrDecr(true)
    handleAddItem(item, quantity)
  }

  useEffect(() => {
    handleUpdateItem(item, quantity)
  },[quantity])

  return (
    <div key={item.id} className='item-div'>
        <span className='item-name'>{item.itemname}</span>
        <span className='item-price'>{item.price}</span>
        <div className='price-div'>
            {!showIncrDecr && <button name='incr' className='incr-decr' onClick={(e) => onAddItem(e, item,1)}>+ ADD</button>}
            {showIncrDecr &&
                <>
                    <button className='incr-decr' name='incr' onClick={(e) => onItemUpdate(e, item)}>+</button>
                    <span className='qty-value'>{quantity}</span>
                    <button className='incr-decr' name='decr' onClick={(e) => onItemUpdate(e, item)}>-</button>
                </>}
        </div>
    </div>
  )
 }
