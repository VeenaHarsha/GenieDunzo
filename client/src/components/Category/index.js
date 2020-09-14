import React from 'react'
import { Link } from 'react-router-dom'

export default ({ category, index }) => {
  const images = ['/images/grocery.png', '/images/fruit-veg.png', '/images/beverage.png', '/images/medicine.png', '/images/pkg.png']

  return (
    <div className='cat-items-list'>
      <Link to={`/orders/${category.name}/${category.id}`} style={{ textDecoration: 'none' }}>
        <div className='cat-item-div'>
          <div className='cat-image'>
            <img width='80px' height='80px' src={images[index]} alt='Category' />
          </div>
          <p className='cat-name'>
            {category.name}
          </p>
        </div>
      </Link>
    </div>
  )
}
