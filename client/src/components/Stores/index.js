import React, { useContext, useEffect } from 'react'
import { AppContext } from '../../context/app/AppContext'
import { AuthContext } from '../../context/auth/AuthContext'
import { Link } from 'react-router-dom'

export default (props) => {
  const images = ['/images/grocery.png', '/images/fruit-veg.png', '/images/beverage.png', '/images/medicine.png', '/images/pkg.png']
  const { storeList, getStoresList } = useContext(AppContext)
  const { categoryName, categoryId } = props.match.params
  const { loadUser } = useContext(AuthContext)

  useEffect(() => {
    loadUser()
    getStoresList(categoryId)
  }, [])
  return (
    <div className='store-container'>
      <div className='store-info-div'>
        <div className='category-div'>
          <img className='sel-cat-img' src={images[categoryId-1]}  alt='Category Image' />
          <p className='sel-cat-name'>{categoryName}</p>
        </div>
        <div className='store-list'>
          {storeList && storeList.map(store => (
            <div key={store.id} className='store-divs-list'>
                <Link to={`/orders/items/${categoryId}/${store.storename}/${store.id}`} style={{textDecoration: 'none'}}>
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
          ))}
        </div>
      </div>
    </div>
  )
}
