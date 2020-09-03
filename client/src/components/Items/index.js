import React, { useContext, useState, useEffect } from 'react'
import { AppContext } from '../../context/app/AppContext'
import { AuthContext } from '../../context/auth/AuthContext'
import { Redirect } from 'react-router-dom'
import Item from './Item'
import Cart from '../Cart'
import { Link } from 'react-router-dom'

function Items ({ match }) {
  const { getStoreCategories, deleteAllCartItems, getItems, selStoreId, selCatId,
     selStoreName,storeAddress, storeCats, itemsList, getItemsOfSelCategory, 
     cart, addCart, updateCart, deleteCartItem } = useContext(AppContext)
  const { user, isAuthenticated } = useContext(AuthContext)
  const [activeLink, setActiveLink] = useState(selCatId)
  const cartTotalAmt = cart.map(item => +item.itemtotal).reduce((a, b) => a + b, 0)

  const changeCategory = (e, cat) => {
    e.preventDefault()
    getItemsOfSelCategory(cat.id)
    setActiveLink(cat.id)
  }

  const removeFromCart = (item) => {
    deleteCartItem(item)
  }

  const onAddItem = (item, quantity) => {
    addCart(item, quantity, selStoreId, user)
  }

  const updateItemInCart = (item, quantity) => {
    console.log(3)
    cart.map(cItem => (
      (cItem.itemid === item.id) ? updateCart(item, quantity, selStoreId, cItem) : ''
    ))
  }
  
  useEffect(() => {
    getItems(selCatId)
    getStoreCategories(match.params.store)
  }, [match.params.store])

  const addToOrders = () => {
    // deleteAllCartItems()
    console.log('Need To delete Cart!!')
  }

  return (
    <>
    {!isAuthenticated
      ? (<Redirect to='/' />)
      : (
      <div className='items-container'>
        <div className='store-details'>
          <p className='store-name-address'>
            {selStoreName} <sub>{storeAddress}</sub>
          </p>
        </div>
        <div className='items-list-div'>
          <div className='search-item-container'>
            <div className='search-item-div'>
              <input className='search-item-input' type='text'  name='search-item' placeholder='Search for an Item' />
            </div>
          </div>
          <div className='items-div-container'>
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
                  // qty={cart.filter(cItem => cItem.itemid === item.id)}
                  handleUpdateItem={updateItemInCart}
                  handleAddItem={onAddItem}
                  removeFromCart={removeFromCart}
                />
              ))}
            </div>
            <div className='cart-div'>
              <div className='store-header-text'>
                <p>Your Cart ( {cart.length} )</p>
              </div>
              <Cart />
              <div className='proceed'>
              <div>
                {cart.length ? <>
                    <span className='cart-total'>Item Total: Rs. {cartTotalAmt}</span>
                    <Link to='/checkout'>
                    {cartTotalAmt > 0 &&
                      <div className='checkout-box'>
                        <input type='button' value='Proceed To Checkout' className='proceed-box' onClick={addToOrders} />
                      </div>}
                  </Link>
                  </> : <span style={{fontSize:'13px'}}>Cart is Empty!!</span>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>)}
    </>
  )
}
export default Items