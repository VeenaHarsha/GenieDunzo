import React, { useEffect,useContext } from 'react'
import { Switch, Route, useLocation, useHistory } from 'react-router-dom'
import './App.css'
import Home from './components/Pages/Home'
import Login from './components/Pages/Login'
import Register from './components/Pages/Register'
import Header from './components/Pages/Header'
import DunzoMap from './components/Pages/DunzoMap'
import { AppContextProvider } from './context/app/AppContext'
import { AuthContextProvider } from './context/auth/AuthContext'
import Stores from './components/Stores/index'
import Items from './components/Items/index'
import Checkout from './components/Checkout'
import Maps from './practice-pages/Maps'
import PrivateRoute from './context/auth/PrivateRoute'

function usePageViews() {
  const location = useLocation()
  const history = useHistory()

  useEffect(() => {
    console.log('AM FROM APP:',location.pathname)
    history.push(location.pathname)
  }, []);
}

function App () {
 usePageViews()
  return (
    <AuthContextProvider>
      <AppContextProvider>
          <div className='main-container'>
            <Header />
            <Switch>
              <Route path='/register' component={Register} />
              <Route path='/' exact component={Login} />
              <Route path='/home' exact component={Home} />
              <Route path='/orders/:categoryName/:categoryId' exact component={Stores} />
              <PrivateRoute path='/orders/items/:selectedCat/:address/:storeName/:storeId' exact component={Items} />
              <PrivateRoute path='/checkout/:address' exact component={Checkout} />
              <PrivateRoute path='/dunzomap' exact component={DunzoMap} />
              {/* <Route path='/map' exact component={Maps} /> */}
              <Route path='*' component={() => "404 Page Not Found!"} />
            </Switch>
          </div>
      </AppContextProvider>
    </AuthContextProvider>
  )
}

export default App
