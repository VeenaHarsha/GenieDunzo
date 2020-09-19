import React from 'react'
import { Switch, Route } from 'react-router-dom'
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
import PrivateRoute from './context/auth/PrivateRoute'
import './App.css'
import PageNotFound from './components/Pages/PageNotFound'

function App () {
  return (
    <AuthContextProvider>
      <AppContextProvider>
          <main className='main-container'>
            <Header />
            <Switch>
              <Route path='/register' component={Register} />
              <Route path='/' exact component={Login} />
              <PrivateRoute path='/home' component={Home} />
              <PrivateRoute path='/orders/:categoryName/:categoryId' exact component={Stores} />
              <PrivateRoute path='/orders/items/:selectedCat/:storeName/:storeId' exact component={Items} />
              <PrivateRoute path='/checkout' component={Checkout} />
              <PrivateRoute path='/dunzomap' component={DunzoMap} />
              <Route component={PageNotFound} />
            </Switch>
          </main>
      </AppContextProvider>
    </AuthContextProvider>
  )
}

export default App
