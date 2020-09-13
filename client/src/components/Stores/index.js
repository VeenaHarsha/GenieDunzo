import React, { useContext, useEffect } from 'react'
import { AppContext } from '../../context/app/AppContext'
import { AuthContext } from '../../context/auth/AuthContext'
import { Redirect } from 'react-router-dom'
import Store from './Store'

export default (props) => {
  const images = ['/images/grocery.png', '/images/fruit-veg.png', '/images/beverage.png', '/images/medicine.png', '/images/pkg.png']
  const { storeList, getStoresList } = useContext(AppContext)
  const { isAuthenticated, loadUser, user, token } = useContext(AuthContext)
  const { categoryName, categoryId } = props.match.params

  useEffect(() => {
    // loadUser()
    getStoresList(categoryId)
    console.log('Am From STORES index:',isAuthenticated, user, categoryId)
  }, [])

  return (
    <>
    {!isAuthenticated 
      ? (<Redirect to='/' />)
      : (
    <div className='store-container'>
      <div className='store-info-div'>
        <div className='category-div'>
          <img className='sel-cat-img' src={images[categoryId-1]}  alt='Category Image' />
          <p className='sel-cat-name'>{categoryName}</p>
        </div>
        <div className='store-list'>
          {storeList.map(store => (
            <Store key={store.id} store={store} selectedCat={categoryId}/>
          ))}
        </div>
      </div>
    </div>
    )}
    </>
  )
}
