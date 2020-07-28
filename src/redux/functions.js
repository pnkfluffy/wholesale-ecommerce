import axios from 'axios'

export const updateCartServer = cart => {
  console.log('updatecart server', cart)
  axios
    .post('/cart', { cart })
    .then(res => {
      console.log('CART UPDATED', res.data)
    })
    .catch(err => {
      console.log(err)
    })
}
