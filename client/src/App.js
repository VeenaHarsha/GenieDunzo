import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './App.css'
import Home from './components/Pages/Home'
import Login from './components/Pages/Login'
import Register from './components/Pages/Register'
import Header from './components/Pages/Header'
import DunzoMap from './components/Pages/DunzoMap'
import { AppContextProvider } from './context/app/AppContext'
import { AuthContextProvider } from './context/auth/AuthContext'
import Stores from './components/Stores'
import Items from './components/Items'
import Checkout from './components/Checkout'
import Maps from './practice-pages/Maps'

function App () {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <AppContextProvider>
          <div className='main-container'>
            <Header />
            <Switch>
              <Route path='/register' component={Register} />
              <Route path='/' exact component={Login} />
              <Route path='/home' exact component={Home} />
              <Route path='/orders/:categoryName/:category' exact component={Stores} />
              <Route path='/orders/items/:storename/:store' exact component={Items} />
              <Route path='/checkout' exact component={Checkout} />
              <Route path='/dunzomap' exact component={DunzoMap} />
              <Route path='/map' exact component={Maps} />
            </Switch>
          </div>
        </AppContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  )
}

export default App
