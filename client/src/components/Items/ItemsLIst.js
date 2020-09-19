import React, { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../../context/auth/AuthContext'
import { AppContext } from '../../context/app/AppContext'
import Item from './Item'

function ItemsList ({ storeId, cart, selectedCat }) {
  const { itemsList,  addCart, updateCart, deleteCartItem, getItemsOfSelCategory , getCartList } = useContext(AppContext)
  const { user } = useContext(AuthContext)
  
  const onRemoveCartItem = (item) => {
    deleteCartItem(storeId, item)
  }

  const onAddCartItem = (item, quantity) => {
    addCart(item, quantity, storeId, user)
  }

  const onItemUpdateInCart = (item, quantity) => {
    cart.map(cItem => (
      (cItem.itemid === item.id) ? updateCart(item, quantity, storeId, cItem) : ''
    ))
  }
  
  return (
  <>
    {itemsList.length === 0 && <h2>Items of this category not found!</h2>}
    {itemsList.map(item => (
      <Item
        key={item.id}
        item={item}
        cart={cart}
        selStoreId={storeId}
        handleUpdateItem={onItemUpdateInCart}
        handleAddItem={onAddCartItem}
        handleRemoveItem={onRemoveCartItem}
      />
    ))}
  </>
  )
}
export default ItemsList
