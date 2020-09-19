export default (state, action) => {
  switch (action.type) {
    
    case 'GET_CAT_LIST': {
      return {
        ...state,
        categoryList: action.payload,
        tokenError: null
      }
    }
    case 'GET_STORE_LIST': {
      return {
        ...state,
        storeList: action.payload 
      }
    }
    case 'GET_STORE_ADDRESS': {
      console.log('am:', action.payload)
      return {
        ...state,
        storeAddress: action.payload
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
    case 'ERROR': 
    case 'INVALID_TOKEN':
      return {
        ...state,
        tokenError: action.payload
      }
    
    default:
      return state
  }
}
