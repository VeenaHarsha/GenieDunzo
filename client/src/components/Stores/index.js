import React, { useContext, useEffect } from 'react'
import { AppContext } from '../../context/app/AppContext'
import { AuthContext } from '../../context/auth/AuthContext'
import { Redirect } from 'react-router-dom'
import Store from './Store'

export default ({ match }) => {
  const images = ['/images/grocery.png', '/images/fruit-veg.png', '/images/beverage.png', '/images/medicine.png', '/images/pkg.png']
  const { storeList, getStoresList, selCatName, selCatId, storeAddress } = useContext(AppContext)
  const { isAuthenticated } = useContext(AuthContext)

  useEffect(() => {
    getStoresList(match.params.category)
  }, [match.params.category])

  return (
    <>
    {!isAuthenticated
      ? (<Redirect to='/' />)
      : (
    <div className='store-container'>
      <div className='store-info-div'>
        <div className='category-div'>
          <img className='sel-cat-img' src={images[selCatId-1]}  alt='Category Image' />
          <p className='sel-cat-name'>{selCatName}</p>
        </div>
        <div className='store-list'>
          {storeList.map(store => (
            <Store key={store.id} store={store} />
          ))}
        </div>
      </div>
    </div>)}
    </>
  )
}
