import React, { useContext } from 'react'
import { AppContext } from '../../context/app/AppContext'
import { Link } from 'react-router-dom'

export default ({ store }) => {
  const { handleStoreClick } = useContext(AppContext)

  return (
    <div
      key={store.id}
      className='store-divs-list'
      onClick={() => handleStoreClick({ selStoreId: store.id, selStoreName: store.storename, storeAddress: store.address })}
    >
    <Link to={`/orders/items/${store.storename}/${store.id}`} style={{textDecoration: 'none'}}>
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
