import React, { createContext, useReducer } from 'react'
import AppReducer from './AppReducer'

const initialState = {
  categoryList: [],
  storeList: [],
  itemsList: [],
  storeCats: [],
  cart: [],
  storeAddress: '',
  tokenError: null
}

export const AppContext = createContext()

export const AppContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(AppReducer, initialState)

  const getAllCategories = async () => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'x-auth-token': window.localStorage.getItem('token')
      }
    }
    try {
      const response = await window.fetch('/dunzo/category/getCategories', options)
      const data = await response.json()
      console.log('GET ALL CATD:', response, data)
      if(data.msg) dispatch({ type: 'INVALID_TOKEN', payload: data })
      dispatch({ type: 'GET_CAT_LIST', payload: data })
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err })
    }
  }

  const getStoresList = async (cat) => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'x-auth-token': window.localStorage.getItem('token')
      }
    }
    try {
      const response = await window.fetch(`/dunzo/stores/getStoresList/${cat}`, options)
      const data = await response.json()
      console.log('DA:', data, data.msg)
      if(data.msg){
         dispatch({ type: 'INVALID_TOKEN', payload: data })
         return
      } 
    dispatch({ type: 'GET_STORE_LIST', payload: data })
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err })
    }
  }

  const getStoreAddress = async (storeId) => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'x-auth-token': window.localStorage.getItem('token')
      }
    }
    try {
      const response = await window.fetch(`/dunzo/stores/getStoreAddress/${storeId}`, options)
      const data = await response.json()
      dispatch({ type: 'GET_STORE_ADDRESS', payload: data[0].address })
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err })
    }
  }

  const getAllItems = async (catId) => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'x-auth-token': window.localStorage.getItem('token')
      }
    }
    try {
      const response = await window.fetch(`/dunzo/items/getAllItems/${catId}`, options)
      const data = await response.json()
      dispatch({ type: 'GET_ITEMS_LIST', payload: data })
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err })
    }
  }

  const getItems = async (store, selCatId) => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'x-auth-token': window.localStorage.getItem('token')
      }
    }
    try {
      const response = await window.fetch(`/dunzo/items/getItems/?storeid=${store}&&catid=${selCatId}`, options)
      const data = await response.json()
      dispatch({ type: 'GET_ITEMS_LIST', payload: data })
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err })
    }
  }

  const getItemsOfSelCategory = async (storeId,cat) => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'x-auth-token': window.localStorage.getItem('token')
      }
    }
    try {
      const response = await window.fetch(`/dunzo/items/getItems/?storeid=${storeId}&&catid=${cat}`, options)
      const data = await response.json()
      dispatch({ type: 'GET_ITEMS_LIST', payload: data })
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err })
    }
  }

  const getStoreCategories = async (storeId) => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'x-auth-token': window.localStorage.getItem('token')
      }
    }
    try {
      const response = await window.fetch(`/dunzo/stores/getStoreCats/${storeId}`, options)
      const data = await response.json()
      dispatch({ type: 'GET_STORE_CAT_LIST', payload: data })
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err })
    }
  }

  const getCartList = async (storeId, userId) => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'x-auth-token': window.localStorage.getItem('token')
      }
    }
    try {
      const response = await window.fetch(`/dunzo/cart/getCartList/?storeid=${storeId}&&userid=${userId}`, options)
      const data = await response.json()
      dispatch({ type: 'GET_CART_LIST', payload: data })
      // data.length ? dispatch({ type: 'GET_CART_LIST', payload: data }) : dispatch({ type: 'ERROR', payload: data.message })
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err })
    }
  }

  const addCart = async (item, quantity, storeId, user) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'x-auth-token': window.localStorage.getItem('token')
      },
      body: JSON.stringify({
        userid: user.id,
        itemid: item.id,
        itemname: item.itemname,
        quantity: quantity,
        storeid: storeId,
        price: item.price
      })
    }
    try {
      const response = await window.fetch('/dunzo/cart/addCart', options)
      const data = await response.json()
      dispatch({ type: 'ADD_CART', payload: data })
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err })
    }
  }

  const updateCart = async (item, quantity, storeId, cart) => {
    const options = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json;charset=UTF-8' },
      body: JSON.stringify({
        itemid: item.id,
        quantity: quantity,
        storeid: storeId,
        price: item.price
      })
    }
    try {
      const response = await window.fetch(`/dunzo/cart/updateCart/${cart.id}`, options)
      const data = await response.json()
      dispatch({ type: 'UPDATE_CART', payload: data })
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err })
    }
  }

  const deleteCartItem = async (storeId,cartItem) => {
    const options = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json;charset=UTF-8' }
    }
    try {
      const response = await window.fetch(`/dunzo/cart/deleteCart/?storeid=${storeId}&&cartitem=${cartItem}`, options)
      await response.json()
      dispatch({ type: 'DELETE_CART', payload: cartItem })
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err })
    }
  }

  const deleteAllCartItems = async (storeId) => {
    const options = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json;charset=UTF-8' }
    }
    try {
      const response = await window.fetch(`/dunzo/cart/deleteAllCart/${storeId}`, options)
      await response.json()
      dispatch({ type: 'DELETE_ALL_CART' })
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err })
    }
  }
  
  return (
    <AppContext.Provider value={{
      categoryList: state.categoryList,
      storeList: state.storeList,
      itemsList: state.itemsList,
      storeCats: state.storeCats,
      cart: state.cart,
      storeAddress: state.storeAddress,
      tokenError: state.tokenError,
      getAllCategories: getAllCategories,
      getStoresList: getStoresList,
      getAllItems: getAllItems,
      getItems: getItems,
      getStoreCategories: getStoreCategories,
      getItemsOfSelCategory: getItemsOfSelCategory,
      addCart: addCart,
      updateCart: updateCart,
      deleteCartItem: deleteCartItem,
      getCartList: getCartList,
      deleteAllCartItems: deleteAllCartItems,
      getStoreAddress: getStoreAddress
    }}
    >
      {children}
    </AppContext.Provider>
  )
}
