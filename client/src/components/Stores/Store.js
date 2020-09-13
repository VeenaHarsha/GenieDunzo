import React, { useContext, useEffect } from 'react'
import { AppContext } from '../../context/app/AppContext'
import { AuthContext } from '../../context/auth/AuthContext'
import { Link } from 'react-router-dom'

export default ({ store, selectedCat }) => {
  const { handleStoreClick, storeAddress } = useContext(AppContext)
  const { isAuthenticated, loadUser, user } = useContext(AuthContext)

  // useEffect(() => {
  //   loadUser()
  //   console.log('Am From STORES 2:', isAuthenticated, user)
  // }, [])

  // onClick={() => handleStoreClick({ selStoreId: store.id, selStoreName: store.storename, storeAddress: store.address })}
  
  return (
    <div
      key={store.id}
      className='store-divs-list'
    >
    <Link to={`/orders/items/${selectedCat}/${store.storename}/${store.id}`} style={{textDecoration: 'none'}}>
      <div className='store-item-div'>
        <div>
          <img  width='80px' height='80px' className='store-image' src='/images/store-img.jpg' alt='Store' />
        </div>
        <div className='store-name'>
          <p>{store.storename}</p>
          <p>{store.address}</p>
        </div>
      </div>
    </Link>
    </div>
  )
}
