import axios from 'axios'
import store from './redux/store'

export const initializeAllRequests = async () => {
  console.log('redux initializing')
  await getAllCategories()
  await getAllProducts()
  axios
    .get('/auth/user')
    .then(async res => {
      store.dispatch({ type: 'APP_LOADED' })
      //  only fires if user get successfull
      store.dispatch({ type: 'GET_USER', payload: res.data })
      store.dispatch({ type: 'SET_FAVORITES', payload: res.data.favorites })
      await getAllReviews()
      await getUserCart()
      await getUserFavorites()
      await getAllOrders()
    })
    .catch(err => {
      store.dispatch({ type: 'APP_LOADED' })
      console.log('not logged in or admin', err)
    })
}

export const getUserCart = () => {
  return axios
    .get('/api/cart')
    .then(res => {
      if (res.data) {
        const filtered = res.data.filter(function (el) {
          return el != null
        })
        console.log('getcart', res.data)

        store.dispatch({ type: 'SET_CART', payload: filtered })
      }
    })
    .catch(err => {
      console.log(err)
    })
}

export const getUserFavorites = () => {
  return axios
    .get('/auth/favorites')
    .then(res => {
      if (res.data) {
        console.log('getfaves', res.data)
        store.dispatch({ type: 'SET_FAVORITES', payload: res.data })
      }
    })
    .catch(err => {
      console.log(err)
    })
}

const categories = [
  'Flower',
  'Edibles',
  'Concentrates',
  'Topicals',
  'Pet Products',
  'Accessories'
]

const getAllCategories = () => {
  store.dispatch({ type: 'SET_CATEGORIES', payload: categories })
  // return axios
  //   .get('/api/products/categories')
  //   .then(res => {
  //     console.log('categories here', res.data)
  //   store.dispatch({ type: 'SET_CATEGORIES', payload: res.data })
  // })
  // .catch(err => {
  //   console.log(err)
  // })
}

export const getAllProducts = () => {
  return axios
    .get('/api/products/all')
    .then(res => {
      console.log(res)
      store.dispatch({ type: 'ADD_ALL_PRODUCTS', payload: res.data })
    })
    .catch(err => {
      console.log(err)
    })
}

export const getAllReviews = () => {
  return axios
    .get('/api/reviews/all')
    .then(res => {
      store.dispatch({ type: 'ADD_REVIEWS', payload: res.data })
    })
    .catch(err => console.log(err))
}

export const getAllOrders = () => {
  //get all orders from user
  return axios
    .get('/api/orders/from')
    .then(res => {
      store.dispatch({ type: 'ADD_ORDERS', payload: res.data })
    })
    .catch(err => {
      console.log(err)
    })
}
