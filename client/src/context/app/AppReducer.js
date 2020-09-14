export default (state, action) => {
  switch (action.type) {
    
    case 'GET_CAT_LIST': {
      return {
        ...state,
        categoryList: action.payload
      }
    }

    case 'HANDLE_CAT_CLICK': {
       window.localStorage.setItem('selCategoryId', action.payload.selCatId)
       window.localStorage.setItem('selCategoryName', action.payload.selCatName)
      return {
        ...state,
        selCatId: action.payload.selCatId,
        selCatName: action.payload.selCatName
      }
    }

    case 'GET_STORE_LIST': {
      return {
        ...state,
        storeList: action.payload 
      }
    }
    case 'HANDLE_STORE_ADDR': {
      console.log('action.payload.storeAddress', action.payload.storeAddress)
      return {
        ...state,
        storeAddress: action.payload.storeAddress
      }
    }
    case 'GET_ITEMS_LIST': {
      return {
        ...state,
        itemsList: action.payload
      }
    }
    case 'GET_STORE_CAT_LIST': {
      return {
        ...state,
        storeCats:  action.payload
      }
    }
    case 'SHOWINCRDECR': {
      return {
        ...state,
        showIncrDecr: true
      }
    }
    case 'ADD_CART': {
      console.log('ADD_CART', action.payload)
      return {
        ...state,
        cart: [...state.cart, ...action.payload]
      }
    }
    case 'UPDATE_CART': {
      const newCart = state.cart.map(cartItem => (
        action.payload.length && (cartItem.id === action.payload[0].id) ? { ...cartItem, quantity: action.payload[0].quantity, itemtotal: action.payload[0].itemtotal }
          : cartItem
      ))
      return {
        ...state,
        cart: newCart
      }
    }
    case 'DELETE_CART': {
      return {
        ...state,
        cart: state.cart.filter(cart => cart.itemid !== action.payload)
      }
    }
    case 'DELETE_ALL_CART': {
      return {
        ...state,
        cart: []
      }
    }
    case 'GET_CART_LIST': {
      return {
        ...state,
        cart: action.payload
      }
    }
    case 'ERROR': {
      return {
        ...state,
        'Error: ': action.payload
      }
    }
    default:
      return state
  }
}
