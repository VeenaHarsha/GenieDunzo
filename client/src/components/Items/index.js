import React, {useContext, useState, useEffect} from 'react'
import { AppContext } from '../../context/app/AppContext'
import Item from '../Item'
import Cart from '../Cart'

export default ({match}) => {
  const {getStoreCategories, getItems, selStoreId, selCatId, selStoreName, storeCats, itemsList, getItemsOfSelCategory, cart, addCart, updateCart,deleteCartItem  } = useContext(AppContext)
  const [activeLink, setActiveLink] = useState(selCatId)
  
  const changeCategory = (e, cat) => {
    e.preventDefault()
    getItemsOfSelCategory(cat.id)
    setActiveLink(cat.id)
  }

  const removeFromCart = (item) => {
    deleteCartItem(item)  
  }
  
  const onAddItem =  (item, quantity) => {
    addCart(item, quantity, selStoreId)
  }

  const updateItemInCart = (item, quantity) => {
    cart.map(cItem => (
      (cItem.itemid === item.id) ? updateCart(item, quantity, selStoreId, cItem) : ''
    ))
  }

  useEffect(()=> {
    getItems(selCatId)
    getStoreCategories(match.params.store)
  }, [match.params.store])

  return (
  <>
    <div className='items-container'>
      <p className='sel-category-name'>
        {selStoreName}
      </p>
      <div className='items'>
        <div className='side-categories'>
          {storeCats.map(cat => (
            <div
              key={cat.id} 
              className={`side-category-div ${cat.id === activeLink ? ' active' : ''} `}
              onClick={(e) => changeCategory(e, cat)}
            >
              {cat.name}
            </div>
          ))}
        </div>
        <div className='items-div'>
          {itemsList.length === 0 && <h2>Items of this category not found!</h2>}
          {itemsList.map(item => (
            <Item
              key={item.id}
              item={item}
              cart={cart}
              handleUpdateItem={updateItemInCart}
              handleAddItem={onAddItem}
              removeFromCart={removeFromCart}
            />
          ))}
        </div>
        <div className='cart-div'>
          <div className='store-header-text'>
              <p>Your Cart ( {cart.length} ) <sub>STORE: {selStoreName}</sub></p>
          </div>
            <Cart />
        </div>
      </div>
    </div>
    </>
  )  
}