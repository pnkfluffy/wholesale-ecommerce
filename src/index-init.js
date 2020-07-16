import axios from 'axios'
import store from './redux/store'

export const initializeAllRequests = () => {
  console.log('redux initializing')
  getAllProducts()
  axios
    .get('/auth/user')
    .then(res => {
      store.dispatch({ type: 'GET_USER', payload: res.data })
      store.dispatch({ type: 'APP_LOADED' })
    })
    .catch(err => {
      store.dispatch({ type: 'APP_LOADED' })
      console.log(err)
    })
}

export const initializeLoggedInRequests = () => {
  console.log('logged in initializing')
  getUserCart();
}

export const getUserCart = () => {
  //get last open cart from db
  axios
    .get('orders/openOrder')
    .then(res => {
      console.log('GOT ORDER', res.data.order)
      if (res.data.order) {
        store.dispatch({ type: 'ADD_ORDER', payload: res.data.order })
      }
    })
    .catch(err => {
      console.log(err)
    })
}

export const getAllProducts = () => {
  axios
    .get('products/all')
    .then(res => {
      console.log(res)
      store.dispatch({ type: 'ADD_ALL_PRODUCTS', payload: res.data })
    })
    .catch(err => {
      console.log(err)
    })
}
