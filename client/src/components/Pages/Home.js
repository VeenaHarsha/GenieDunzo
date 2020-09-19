import React, { useEffect, useState, useContext } from 'react'
import Category from '../Category/index'
import { AppContext } from '../../context/app/AppContext'
import { AuthContext } from '../../context/auth/AuthContext'
import DPHome from './DPHome'

function Home () {
  const { categoryList, getAllCategories } = useContext(AppContext)
  const { user, loadUser } = useContext(AuthContext)

  useEffect(() => {
    loadUser()
    getAllCategories()
  }, [])

  return  (
    <section className='home-container'>
      {!user.deliverypartner ? (
        <main className='main-div'>
          {categoryList.length && categoryList.map((category) => (
            <Category
              key={category.id}
              category={category}
              catId={category.id}
            />
          ))}
        </main>
      ) : (
        <DPHome />
      )}
    </section>
  )
}

export default Home
