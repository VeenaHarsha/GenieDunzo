import React, { useContext, useState, useEffect } from 'react'
import { AppContext } from '../../context/app/AppContext'
import { AuthContext } from '../../context/auth/AuthContext'
import { Redirect, Link } from 'react-router-dom'
import Item from './Item'
import Cart from '../Cart'

function Items (props) {
  const {
    storeList, getStoreCategories, deleteAllCartItems, getItems, 
    storeCats, itemsList, getItemsOfSelCategory,
    cart, addCart, updateCart, deleteCartItem
  } = useContext(AppContext)
  const { user, isAuthenticated } = useContext(AuthContext)
  const {selectedCat,storeId, storeName} = props.match.params
  const [activeLink, setActiveLink] = useState(selectedCat)
  const [storeAddress, setStoreAddress] = useState('')

  const cartTotalAmt = cart.map(item => +item.itemtotal).reduce((a, b) => a + b, 0)

  const changeCategory = (e, cat) => {
    e.preventDefault()
    getItemsOfSelCategory(storeId,cat.id)
    setActiveLink(cat.id)
  }

  const removeFromCart = (item) => {
    deleteCartItem(storeId,item)
  }

  const onAddItem = (item, quantity) => {
    addCart(item, quantity, storeId, user)
  }

  const updateItemInCart = (item, quantity) => {
    cart.map(cItem => (
      (cItem.itemid === item.id) ? updateCart(item, quantity, storeId, cItem) : ''
    ))
  }

  const getStoreAddress = (storeId) => {
    storeList.filter(ele => {
      if(ele.id === +storeId) setStoreAddress(ele.address)
    });
  }

  useEffect(() => {
    getStoreAddress(storeId)
    getItems(storeId, selectedCat)
    // getItems(selectedCat)
    getStoreCategories(storeId)
  }, [storeId])

  const addToOrders = () => {
    deleteAllCartItems(storeId)
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
                {storeName} <sub>{storeAddress}</sub>
              </p>
            </div>
            <div className='items-list-div'>
              <div className='search-item-container'>
                <div className='search-item-div'>
                  <input className='search-item-input' type='text' name='search-item' placeholder='Search for an Item' />
                </div>
              </div>
              <div className='items-div-container'>
                <div className='side-categories'>
                  {storeCats.map(cat => (
                    <div
                      key={cat.id}
                      className={`side-category-div ${cat.id === +activeLink ? ' active' : ''} `}
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
                      selStoreId={storeId}
                      handleUpdateItem={updateItemInCart}
                      handleAddItem={onAddItem}
                      removeFromCart={removeFromCart}
                    />
                  ))}
                </div>
                <div className='cart-div'>
                  <div className='store-header-text'>
                  <p>Your Cart ( {cart.length} ){storeId}</p>
                  </div>
                  <Cart selStoreId={storeId}/>
                  <div className='proceed'>
                    {cart.length ? <>
                      <span className='cart-total'>Item Total: ₹ {cartTotalAmt}</span>
                      <Link to='/checkout'>
                        {cartTotalAmt > 0 &&
                          <div className='checkout-box'>
                            <input type='button' value='Proceed To Checkout' className='proceed-box' onClick={addToOrders} />
                          </div>}
                      </Link>
                    </> : <span className='store-header-text'>Cart is Empty!!</span>}
                  </div>
                </div>
              </div>
            </div>
          </div>
          )} 
    </>
  )
}
export default Items
