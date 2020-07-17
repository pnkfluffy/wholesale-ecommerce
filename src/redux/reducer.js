import { combineReducers } from 'redux'

const initialUser = {
  name: ''
}

const user = (state = initialUser, action) => {
  switch (action.type) {
    case 'GET_USER':
      return action.payload
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
    case 'UPDATE_CATEGORY':
      return {
        ...state,
        category: action.payload
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

const order = (state = '', action) => {
  switch (action.type) {
    case 'ADD_ORDER':
      return action.payload
    default:
      return state
  }
}

export default combineReducers({
  user,
  products,
  order,
  loaded
})
