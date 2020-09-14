import React, { useEffect, useState, useContext } from 'react'
import Category from '../Category/index'
import { AppContext } from '../../context/app/AppContext'
import { AuthContext } from '../../context/auth/AuthContext'
import { Redirect } from 'react-router-dom'
import DPHome from './DPHome'

function Home (props) {
  const [showCategory, setShowCategory] = useState(true)
  const [setShowStores] = useState(false)
  const { categoryList, getAllCategories } = useContext(AppContext)
  const { user, isAuthenticated , loadUser} = useContext(AuthContext)

  useEffect(() => {
    loadUser()
    // console.log('AM HERE in HOME Veena',user, isAuthenticated, props.match,props.location,props.history)
    console.log('Am From HOME:', isAuthenticated, user)
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
