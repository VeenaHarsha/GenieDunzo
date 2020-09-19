import React from 'react'
import { Link } from 'react-router-dom'

export default ({ category, catId }) => {
  const images = ['/images/grocery.png', '/images/fruit-veg.png', '/images/beverage.png', '/images/medicine.png', '/images/pkg.png']

  return (
    <article className='cat-items-list'>
      <Link to={`/orders/${category.name}/${category.id}`} style={{ textDecoration: 'none' }}>
        <figure className='cat-item-div'>
          <img className='cat-image' width='80px' height='80px' src={images[catId-1]} alt='Category' />
  <figcaption className='cat-name'>{category.name}</figcaption>
        </figure>
      </Link>
    </article>
  )
}
