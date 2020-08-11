import React, { useEffect, useState, useContext } from 'react'
import Category from '../components/Category/index'
import Stores from '../components/Stores'
import { AppContext } from '../context/app/AppContext'
import Items from '../components/Items'

function Home () {
  const [showCategory, setShowCategory] = useState(true)
  const [showStores, setShowStores] = useState(false)
  const [showItems, setShowItems] = useState(false)
  // const [showStore, setShowStore] = useState(true)
  const { categoryList,  storeList,  getAllCategories } = useContext(AppContext)

  useEffect(() => {
    getAllCategories()
  }, [])

  const toggleShowCat = (flag) => {
    setShowCategory(flag)
  }

  const toggleShowStores = (flag) => {
    setShowStores(flag)
  }

  const toggleShowItems = (flag) => {
    setShowItems(flag)
  }
  return (
    <div className='home-container'>
        {showCategory && categoryList.map((category, index) => (
          <Category
            key={category.id}
            category={category}
            index={index}
            toggleShowCat={toggleShowCat}
            toggleShowStores={toggleShowStores}
          />
        ))}
        {/* {showStores &&
         <Stores
           storeList={storeList}
           toggleShowStores={toggleShowStores}
           toggleShowItems={toggleShowItems}
         />} */}
        {/* {showItems && <Items />} */}
    </div>
  )
}

export default Home
