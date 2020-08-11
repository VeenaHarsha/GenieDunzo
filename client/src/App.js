import React, {useContext} from 'react'
import './App.css'
import Home from './pages/Home'
import Header from './pages/Header'
import { AppContextProvider } from './context/app/AppContext'
import {Switch, Route} from 'react-router-dom'
import Stores from './components/Stores/index'
import Items from './components/Items'
import AddressInfo from './components/AddressInfo'

function App () {
  return (
      <div className='main-container'>
        <AppContextProvider>
            <Header />
            <Switch>
              <Route path='/' exact component={Home} />
              <Route path='/orders/:categoryName/:category' exact component={Stores} />
              <Route path='/orders/items/:storename/:store' exact component={Items} />
              <Route path='/address' exact component={AddressInfo} />
            </Switch>
        </AppContextProvider>
      </div>
  )
}

export default App
