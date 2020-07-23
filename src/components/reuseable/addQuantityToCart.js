import store from '../../redux/store'

export const addQuantityToCart = product => {
  let productInCart = store
    .getState()
    .reducer.cart.find(c => c.product === product._id)
  if (productInCart) {
    const newQuantity =
      parseInt(productInCart.quantity, 10) + parseInt(product.quantity, 10)
    store.dispatch({
      type: 'UPDATE_CART_ITEM',
      payload: {
        id: product._id,
        quantity: newQuantity
      }
    })
  } else {
    store.dispatch({
      type: 'ADD_TO_CART',
      payload: product
    })
  }
}
