import React, { useEffect, useState, useContext } from 'react'
import Category from '../Category/index'
import { AppContext } from '../../context/app/AppContext'
import { AuthContext } from '../../context/auth/AuthContext'
import { Redirect, Link } from 'react-router-dom'
import DPHome from './DPHome'

function Home () {
  const [showCategory, setShowCategory] = useState(true)
  const [showStores, setShowStores] = useState(false)
  const { categoryList, getAllCategories } = useContext(AppContext)
  const { user, isAuthenticated } = useContext(AuthContext)

  useEffect(() => {
    getAllCategories()
  }, [])

  const toggleShowCat = (flag) => {
    setShowCategory(flag)
  }

  const toggleShowStores = (flag) => {
    setShowStores(flag)
  }

  return (
    <>
    {!isAuthenticated 
      ? (<Redirect to='/' />)
      : (
          <div className='home-container'>
          {!user.deliverypartner ? (
             <div className='main-div'>
                {showCategory && categoryList.map((category, index) => (
                  <Category
                    key={category.id}
                    category={category}
                    index={index}
                    toggleShowCat={toggleShowCat}
                    toggleShowStores={toggleShowStores}
                  />
                ))}
                {/* <Link to='/map'>
                    <div className='checkout-box'>
                      <input type='button' value='GO To MAP' className='proceed-box'/>
                    </div>
                </Link> */}
              </div>
              ) : (
                  <DPHome />
              )}
          </div>
        )}
    </>
  )
}

export default Home
