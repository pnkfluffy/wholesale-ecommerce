import axios from 'axios'

export const updateCartServer = cart => {
  axios
    .post('/api/cart', { cart })
    .then(res => {
      console.log('CART UPDATED', res.data)
    })
    .catch(err => {
      console.log(err)
    })
}
