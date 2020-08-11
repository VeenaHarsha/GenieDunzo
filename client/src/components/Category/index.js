import React, { useContext } from 'react'
import { AppContext } from '../../context/app/AppContext'
import {Link} from 'react-router-dom'

export default ({ category, index }) => {
  const images = ['/images/grocery.png', '/images/fruit-veg.png', '/images/beverage.png', '/images/medicine.png', '/images/pkg.png']
  const { handleCategory } = useContext(AppContext)

  return (
    <Link to={`/orders/${category.name}/${category.id}`}>
      <div className='cat-item-div' onClick={() => handleCategory({ selCatId: category.id, selCatName: category.name })}>
        <div className='cat-image'>
          <img src={images[index]} alt='Category' />
        </div>
        <p className='cat-name'>
          {category.name}
        </p>
      </div>
    </Link>
  )
}
