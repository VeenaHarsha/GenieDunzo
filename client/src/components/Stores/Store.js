import React, {useContext, useEffect} from 'react'
import { AppContext } from '../../context/app/AppContext'
import {Link} from 'react-router-dom'

export default ({ store }) => {
  const {handleStoreClick} = useContext(AppContext)

  return (
    <Link to={`/orders/items/${store.storename}/${store.id}`}>
      <div
        key={store.id}
        className='store-name'
        onClick={() => handleStoreClick({ selStoreId: store.id, selStoreName: store.storename })}
      >
        <p>{store.storename}</p>
      </div>
    </Link>
  )
}
