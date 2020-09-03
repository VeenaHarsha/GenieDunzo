import React, { createContext, useReducer } from 'react'
import AppReducer from './AppReducer'

const initialState = {
  categoryList: [],
  storeList: [],
  itemsList: [],
  storeCats: [],
  cart: [],
  selCatId: '',
  selCatName: '',
  selStoreId: '',
  selStoreName: '',
  deliveryDetails: {},
  isAccepted: false
}

export const AppContext = createContext()

export const AppContextProvider = (props) => {
  const [state, dispatch] = useReducer(AppReducer, initialState)

  const acceptDelivery = (flag) => {
    dispatch({ type: 'IS_ACCEPTED', payload: flag })
  }
  const getDeliveryDetails = async () => {
    try {
      const response = await window.fetch('/dunzo/category/getDeliveries')
      const data = await response.json()
      dispatch({ type: 'GET_DELIVERY_LIST', payload: data })
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err })
    } 
  }
  const addToDeliveries = async (storeAddress, deliveryAddress) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'x-auth-token': window.localStorage.getItem('token')
      },
      body: JSON.stringify({
        storeAddress: storeAddress,
        deliveryAddress:deliveryAddress
      })
    }
    try {
      const response = await window.fetch('/dunzo/category/addToDeliveries', options)
      const data = await response.json()
      dispatch({ type: 'ADD_TO_DELIVERY', payload: data })
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err })
    }
  }
  const deleteDeliveries = async() =>{
    const options = {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json;charset=UTF-8'}
    }
    try {
      const response = await window.fetch('/dunzo/category/deleteDeliveries', options)
      const data = await response.json()
      dispatch({ type: 'DELETE_ALL_DELIVERIES'})
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err })
    }
  }
  const getAllCategories = async () => {
    try {
      const response = await window.fetch('/dunzo/category/getCategories')
      const data = await response.json()
      dispatch({ type: 'GET_CAT_LIST', payload: data })
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err })
    } 
  }
  const handleCategory = (data) => {
    dispatch({ type: 'HANDLE_CAT_CLICK', payload: data })
  }

  const getStoresList = async (cat) => {
    try {
      const response = await window.fetch(`/dunzo/stores/getStoresList/${cat}`)
      const data = await response.json()
      dispatch({ type: 'GET_STORE_LIST', payload: data })
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err })
    }
  }

  const handleStoreClick = (data) => {
    dispatch({ type: 'HANDLE_STORE_CLICK', payload: data })
  }

  const getAllItems = async (catId) => {
   try {
      const response = await window.fetch(`/dunzo/items/getAllItems/${catId}`)
      const data = await response.json()
      dispatch({ type: 'GET_ITEMS_LIST', payload: data })
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err })
    }
  }
  const getItems = async (store) => {
   try {
    const response = await window.fetch(`/dunzo/items/getItems/?storeid=${store}&&catid=${state.selCatId}`)
    const data = await response.json()
    dispatch({ type: 'GET_ITEMS_LIST', payload: data })
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err })
    }
  }
  const getItemsOfSelCategory = async (cat) => {
   try {
      const response = await window.fetch(`/dunzo/items/getItems/?storeid=${state.selStoreId}&&catid=${cat}`)
      const data = await response.json()
      dispatch({ type: 'GET_ITEMS_LIST', payload: data })
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err })
    }
  }
  const getStoreCategories = async (storeId) => {
   try {
      const response = await window.fetch(`/dunzo/stores/getStoreCats/${storeId}`)
      const data = await response.json()
      dispatch({ type: 'GET_STORE_CAT_LIST', payload: data })
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err })
    }
  }
  const getCartList = async (storeId, userId) => {
    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'x-auth-token': window.localStorage.getItem('token')
        }
      }
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
      dispatch({ type: 'ADD_Cart', payload: data })
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err })
    }
  }

  const updateCart = async (item, quantity, storeId, cart) => {
    const options = {
      method: 'PUT',
      headers: {'Content-Type': 'application/json;charset=UTF-8'},
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
      dispatch({ type: 'UPDATE_Cart', payload: data })
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err })
    }
  }
  const deleteCartItem = async (cartItem) => {
    const options = {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json;charset=UTF-8'}
    }
    try {
      const response = await window.fetch(`/dunzo/cart/deleteCart/?storeid=${state.selStoreId}&&cartitem=${cartItem}`, options)
      const data = await response.json()
      dispatch({ type: 'DELETE_CART', payload: cartItem })
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err })
    }
  }
  const deleteAllCartItems = async() =>{
    const options = {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json;charset=UTF-8'}
    }
    try {
      const response = await window.fetch(`/dunzo/cart/deleteAllCart/${state.selStoreId}`, options)
      const data = await response.json()
      console.log('DELETE ALL ITEMS:', data)
      dispatch({ type: 'DELETE_ALL_CART', payload: data.cart})
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err })
    }
  }
  return (
    <AppContext.Provider value={{
      categoryList: state.categoryList,
      storeList: state.storeList,
      itemsList: state.itemsList,
      selCatId: state.selCatId,
      selCatName: state.selCatName,
      selStoreId: state.selStoreId,
      selStoreName: state.selStoreName,
      storeAddress: state.storeAddress,
      storeCats: state.storeCats,
      cart: state.cart,
      deliveryDetails: state.deliveryDetails,
      getAllCategories: getAllCategories,
      handleCategory: handleCategory,
      handleStoreClick: handleStoreClick,
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
      getDeliveryDetails: getDeliveryDetails,
      addToDeliveries: addToDeliveries,
      deleteDeliveries: deleteDeliveries,
      acceptDelivery: acceptDelivery
    }}
    >
      {props.children}
    </AppContext.Provider>
  )
}