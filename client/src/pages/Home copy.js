import React from 'react'

function Home () {
  return (
    <div class='home-container'>
      <div class='main-cat-div'>
        <div className='cat-item-div'>
          <img className='cat-image' src='/images/veggies.jpg' alt='Veg' />
          <p className='cat-name'>Groceries</p>
        </div>
        <div className='cat-item-div'>
          <img className='cat-image' src='/images/fruits.jpg' alt='Froot' />
          <p className='cat-name'>Fruits</p>
        </div>
        <div className='cat-item-div'>
          <img className='cat-image' src='/images/medicine.jpg' alt='Medicine' />
          <p className='cat-name'>Medicine</p>
        </div>
        <div className='cat-item-div'>
          <img className='pickdrop-image' src='/images/pickdrop2.jpg' alt='PickDrop' />
          <p className='cat-name'>Pick & Drop</p>
        </div>
      </div>
    </div>
  )
}

export default Home
