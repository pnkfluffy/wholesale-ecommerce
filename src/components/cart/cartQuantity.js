// import React from 'react'
// import { connect } from 'react-redux'
// import { editCartQuantity } from '../cart/cartFunctions'

// class CartQuantity extends React.Component {
//   changeQuantity = quantity => {
//     editCartQuantity(this.props.productID, quantity)
//   }

//   render () {
//     const quantity = this.props.productInfo.quantity
//     console.log('quantity', quantity)
//     return (
//       <div className='product_quantity'>
//         <div
//           className='order_quantity_button'
//           onClick={() => this.changeQuantity(quantity - 1)}
//         >
//           -
//         </div>
//         <b>Quantity</b>

//         <input
//           onChange={e => this.changeQuantity(e.target.value)}
//           className='order_card_input'
//           value={quantity}
//           type='number'
//         />

//         <div
//           className='order_quantity_button'
//           onClick={() => this.changeQuantity(quantity + 1)}
//         >
//           +
//         </div>
//       </div>
//     )
//   }
// }
// export default CartQuantity

import React from 'react'
import { connect } from 'react-redux'
import { editCartQuantity } from '../cart/cartFunctions'

const mapStateToProps = state => ({
  state: state.reducer
})

class CartQuantity extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      quantity: this.props.productInfo.quantity
    }
  }

  changeQuantity = quantity => {
    this.setState({ quantity: quantity})
    editCartQuantity(this.props.productID, quantity)
  }

  render () {
    const quantity = this.state.quantity ? this.state.quantity : "";
    return (
      <div className='product_quantity'>
        <div
          className='order_quantity_button'
          onClick={() => this.changeQuantity(this.state.quantity - 1)}
        >
          -
        </div>
        <b>Quantity</b>

        <input
          onChange={e => this.changeQuantity(e.target.value)}
          className='order_card_input'
          value={quantity}
          type='number'
        />

        <div
          className='order_quantity_button'
          onClick={() => this.changeQuantity(this.state.quantity + 1)}
        >
          +
        </div>
      </div>
    )
  }
}
export default connect(mapStateToProps)(CartQuantity)
