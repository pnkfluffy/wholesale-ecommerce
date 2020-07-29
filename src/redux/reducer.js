import { combineReducers } from 'redux'
import { updateCartServer } from './functions'

const initialUser = {
  name: '',
  admin: false
}

const user = (state = initialUser, action) => {
  switch (action.type) {
    case 'GET_USER':
      return action.payload
    case 'SET_ADMIN':
      return { ...state, admin: action.payload }
    default:
      return state
  }
}

const loaded = (state = false, action) => {
  switch (action.type) {
    case 'APP_LOADED':
      return true
    default:
      return state
  }
}

const cart = (state = [], action) => {
  switch (action.type) {
    case 'SET_CART':
      updateCartServer([action.payload])
      return action.payload
    case 'ADD_TO_CART':
      updateCartServer([...state, action.payload])
      return [...state, action.payload]
    case 'UPDATE_CART_ITEM':
      let updateItemIndex = state.findIndex(
        c => c.product === action.payload.id
      )
      state[updateItemIndex].quantity = action.payload.quantity
      updateCartServer([...state])
      return [...state]
    case 'DELETE_CART_ITEM':
      let deleteItemIndex = state.findIndex(
        c => c.product === action.payload.id
      )
      state.splice(deleteItemIndex, 1)
      updateCartServer([...state])
      return [...state]
    default:
      return state
  }
}

const initialCategories = {
  categories: [],
  category: 'All'
}

const categories = (state = initialCategories, action) => {
  switch (action.type) {
    case 'SET_CATEGORIES':
      return { ...state, categories: action.payload }
    case 'UPDATE_CATEGORY':
      return {
        ...state,
        category: action.payload
      }
    default:
      return state
  }
}

const initialProducts = {
  products: [],
  searchTerm: '',
  category: 'All'
}

const products = (state = initialProducts, action) => {
  switch (action.type) {
    case 'ADD_ALL_PRODUCTS':
      return {
        ...state,
        products: action.payload
      }
    case 'UPDATE_SEARCH':
      return {
        ...state,
        searchTerm: action.payload
      }
    default:
      return state
  }
}

const orders = (state = [], action) => {
  switch (action.type) {
    case 'ADD_ORDERS':
      return action.payload
    default:
      return state
  }
}

const reviews = (state = [], action) => {
  switch (action.type) {
    case 'ADD_REVIEWS':
      console.log('Adding REVIEWS' + action.payload)
      return action.payload
    default:
      return state
  }
}

export default combineReducers({
  user,
  categories,
  cart,
  products,
  orders,
  reviews,
  loaded
})
