import React from 'react'

export default () => {
  return (
    <div className='address-container'>
        <div className='address-input'>
            <label id='pickup'> Pick Up From:</label>
            <input type='text' id='pickup' name='pickup' />
        </div>
        <div className='address-input'>
            <label id='drop'> Drop To:</label>
            <input type='text' id='drop' name='drop' />
        </div>
    </div>
  )
}
