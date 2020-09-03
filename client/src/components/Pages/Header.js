import React, { useContext, useEffect }  from 'react'
import { AppContext } from '../../context/app/AppContext'
import { AuthContext } from '../../context/auth/AuthContext'
import { Link } from 'react-router-dom'

function Header () {
  const { cart } = useContext(AppContext)
  const { isAuthenticated, user, logout  } = useContext(AuthContext)
  
  const signOff = () => {
    logout()
  }
  return (
    <div className='head-containers'>
      <div className='head-container-1'>
        <div className='genie-image'><img src='/images/genie-2.png' alt='Genie' /></div>
        <p className='app-name'>Genie</p>
        <p className='caption'>JUST A CLICK AWAY!</p>
     

      {isAuthenticated &&
        <>  
          <p className='links-one'> Welcome {user && user.username} </p>
          <p>
            <Link to='/' onClick={signOff} style={{ textDecoration: 'none' }}>
              <span className='links-two'>Logout</span>
            </Link>
          </p>
          {isAuthenticated && <div>
            <img className='cart-image' src='/images/cart-1.jpeg' alt='Kart' />
            {cart.length ? <sub className='cart-counter'>{cart.length}</sub> : ''}
          </div>}
        </>
        }
        </div>
      
    </div>
  )
}

export default Header
