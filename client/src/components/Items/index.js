import React, { useContext, useState, useEffect } from 'react'
import { AppContext } from '../../context/app/AppContext'
import { AuthContext } from '../../context/auth/AuthContext'
import { Link } from 'react-router-dom'
import Cart from '../Cart'
import ItemsList from './ItemsLIst'

function Items (props) {
  const {
    storeAddress, getStoreAddress, getStoreCategories, deleteAllCartItems, getItems,
    storeCats, getItemsOfSelCategory, cart, getCartList
  } = useContext(AppContext)
  const { user, loadUser } = useContext(AuthContext)
  const { selectedCat, storeId, storeName } = props.match.params
  const [activeLink, setActiveLink] = useState(selectedCat)
  const cartTotalAmt = cart.map(item => +item.itemtotal).reduce((a, b) => a + b, 0)

  const changeCategory = (e, cat) => {
    e.preventDefault()
    getItemsOfSelCategory(storeId, cat.id)
    setActiveLink(cat.id)
  }

  const checkOutOrder = () => {
    deleteAllCartItems(storeId)
  }

  useEffect(() => {
    getStoreAddress(storeId)
    getItems(storeId, selectedCat)
    getStoreCategories(storeId)
  }, [])

  return (
    <section className='items-container'>
      <hgroup className='store-details store-name-address'>
        <h1 className='store-name-address'>{storeName}</h1>
        <sub>{storeAddress}</sub>
      </hgroup>
      <main className='items-list-div'>
        <article className='search-item-container'>
          <p className='search-item-div'>
            <input className='search-item-input' type='text' name='search-item' placeholder='Search for an Item' />
          </p>
        </article>
        <article className='items-div-container'>
          <aside className='side-categories'>
            {storeCats.map(cat => (
              <nav
                key={cat.id}
                className={`side-category-div ${cat.id === +activeLink ? ' active' : ''} `}
                onClick={(e) => changeCategory(e, cat)}
              >
                {cat.name}
              </nav>
            ))}
          </aside>
          <center className='items-div'>
            <ItemsList storeId={storeId} cart={cart} selectedCat={selectedCat}/>
          </center>
          <aside className='cart-div'>
            <header className='store-header-text'>
              <h3>Your Cart ( {cart.length} )</h3>
            </header>
            <Cart selStoreId={storeId} />
            <footer className='proceed'>
              {cart.length
                ? (<article>
                  <data className='cart-total'>Item Total: ₹ {cartTotalAmt}</data>
                  <Link to='/checkout'>
                    {cartTotalAmt > 0 &&
                      <input
                        type='button'
                        value='Proceed To Checkout'
                        className='proceed-box'
                        onClick={checkOutOrder}
                      />}
                  </Link>
                </article>)
                : (<p className='store-header-text'>Cart is Empty!!</p>)}
            </footer>
          </aside>
        </article>
      </main>
    </section>
  )
}
export default Items
