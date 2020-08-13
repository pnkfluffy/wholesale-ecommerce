import axios from 'axios'
import store from './redux/store'

export const initializeAllRequests = async () => {
  // console.log('redux initializing')
  await getAllCategories()
  await getAllProducts()
  axios
    .get('/auth/user')
    .then(async res => {
      //  only fires if user get successfull
      store.dispatch({ type: 'GET_USER', payload: res.data })
      await getURI()
      await getAllReviews()
      await getUserCart()
      await getUserWishlist()
      await getAllOrders()
      await getCustomOrders()
      await checkMandate()
      store.dispatch({ type: 'APP_LOADED' })
    })
    .catch(err => {
      store.dispatch({ type: 'APP_LOADED' })
      // console.log('not logged in or admin', err)
    })
}

const getURI = () => {
  return axios.get('/auth/login-uri').then(res => {
    store.dispatch({ type: 'SET_URI', payload: res.data })
  }).catch(err => {
    // console.log(err);
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
        store.dispatch({ type: 'SET_CART', payload: filtered })
      }
    })
    .catch(err => {
      // console.log(err)
    })
}

export const getUserWishlist = () => {
  return axios
    .get('/auth/wishlist')
    .then(res => {
      if (res.data) {
        store.dispatch({ type: 'SET_WISHLIST', payload: res.data })
      }
    })
    .catch(err => {
      // console.log(err)
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
  //     // console.log('categories here', res.data)
  //   store.dispatch({ type: 'SET_CATEGORIES', payload: res.data })
  // })
  // .catch(err => {
  //   // console.log(err)
  // })
}

export const getAllProducts = () => {
  return axios
    .get('/api/products/all')
    .then(res => {
      // console.log(res)
      store.dispatch({ type: 'ADD_ALL_PRODUCTS', payload: res.data })
    })
    .catch(err => {
      // console.log(err)
    })
}

export const getAllReviews = () => {

  return axios
    .get('/api/reviews/all')
    .then(res => {
      store.dispatch({ type: 'ADD_REVIEWS', payload: res.data })
    })
    .catch(err => {
      // console.log(err)
    })
}

export const getAllOrders = () => {
  //get all orders from user
  return axios
    .get('/api/orders/from')
    .then(res => {
      store.dispatch({ type: 'ADD_ORDERS', payload: res.data })
    })
    .catch(err => {
      // console.log(err)
    })
}

export const getCustomOrders = () => {
  return axios.get('/api/orders/custom')
  .then(res => {
    store.dispatch({ type: 'GET_CUSTOM', payload: res.data[0]})
  })
  .catch(err => {
    console.log(err);
    
  })
}

export const checkMandate = () => {
  axios
    .get('/api/gc/checkClientMandate')
    .then(res => {
      if (res.data) {
        store.dispatch({
          type: 'YES_MANDATE'
        })
      }
    })
    .catch(err => {
      // console.log(err);
    })
}
