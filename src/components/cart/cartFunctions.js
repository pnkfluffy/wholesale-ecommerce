import store from '../../redux/store'
import axios from 'axios'

export const updateCartServer = cart => {
  console.log('updatecartServer')
  console.log('cart', cart)
  axios
    .post('/cart', { cart })
    .then(res => {
      console.log('CART UPDATED', res.data)
    })
    .catch(err => {
      console.log(err)
    })
}

export const removeFromCart = productID => {
  console.log('addtocart', productID)
  const cart = store.getState().reducer.cart
  let itemUpdated = false
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].product === productID) {
      cart[i].quantity--
      if (!cart[i].quantity) cart.splice(i, 1)
      itemUpdated = true
    }
  }
  if (!itemUpdated) return
  store.dispatch({ type: 'SET_CART', payload: cart })
  updateCartServer(cart)
}

export const addToCart = (productID, num) => {
  const numToAdd = num ? num : 1
  console.log('addtocart', productID)
  const cart = store.getState().reducer.cart
  let itemUpdated = false
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].product === productID) {
      cart[i].quantity += numToAdd
      itemUpdated = true
    }
  }
  if (!itemUpdated) cart.push({ product: productID, quantity: numToAdd })
  store.dispatch({ type: 'SET_CART', payload: cart })
  updateCartServer(cart)
}

export const editCartQuantity = (productID, quantity) => {
  console.log('editCartQuantity', productID)
  const cart = store.getState().reducer.cart
  let itemUpdated = false
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].product === productID) {
      cart[i].quantity = quantity
      if (!quantity) cart.splice(i, 1)
      itemUpdated = true
    }
  }
  if (!itemUpdated) cart.push({ product: productID, quantity })

  store.dispatch({ type: 'SET_CART', payload: cart })
  updateCartServer(cart)
  return quantity
}
