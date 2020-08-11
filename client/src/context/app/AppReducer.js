export default (state, action) => {
  switch (action.type) {
    case 'GET_CAT_LIST': {
      return {
        ...state,
        categoryList: action.payload
      }
    }

    case 'HANDLE_CAT_CLICK': {
      return {
        ...state,
        selCatId: action.payload.selCatId,
        selCatName: action.payload.selCatName
      }
    }

    case 'GET_STORE_LIST': {
      console.log('GET STORE LIST:', action.payload)
      return {
        ...state,
        storeList: action.payload //[...state.storeList, ...action.payload]
      }
    }
    case 'HANDLE_STORE_CLICK': {
      return {
        ...state,
        selStoreId: action.payload.selStoreId,
        selStoreName: action.payload.selStoreName
      }
    }
    case 'GET_ITEMS_LIST': {
      return {
        ...state,
        itemsList: action.payload // [...state.itemsList, ...action.payload]
      }
    }
    case 'GET_STORE_CAT_LIST': {
      return {
        ...state,
        storeCats:  action.payload // [...state.storeCats, ...action.payload]
      }
    }
    case 'SHOWINCRDECR': {
      return {
        ...state,
        showIncrDecr: true
      }
    }
    case 'ADD_Cart': {
      return {
        ...state,
        cart: [...state.cart, ...action.payload]
      }
    }
    case 'UPDATE_Cart': {
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
      console.log('VV:', action.payload)
      return {
        ...state,
        cart: state.cart.filter(cart => cart.itemid !== action.payload)
      }
    }
    case 'GET_CART_LIST': {
      return {
        ...state,
        cart: action.payload //[...state.cart, ...action.payload]
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
