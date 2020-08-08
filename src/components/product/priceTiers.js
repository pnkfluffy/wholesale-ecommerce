import React from 'react'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import Swal from 'sweetalert2'
import { addQuantityToCart } from '../reuseable/addQuantityToCart'

const PriceTierRow = ({ tier, addToCart }) => (
  <tr className='price_table_row'>
    <td className='table_units'>{tier.quantity}</td>
    <td className='table_price'>${tier.price}</td>
    <td className='table_total'>${tier.price * tier.quantity}</td>
    <td className='table_add_to_cart'>
      <AddShoppingCartIcon
        onClick={() => addToCart(tier.quantity, tier.quantity * tier.price)}
        className='table_add_cart_icon'
      />
    </td>
  </tr>
)

class PriceTiers extends React.Component {
  addToCart = (quantity, total) => {
    Swal.fire({
      title: `Add ${quantity} items to your cart?`,
      text: `total: $${total}`,
      icon: 'question',
      showCancelButton: true,
      background: '#1E1F26',
      customClass: {
        confirmButton: 'swal_confirm_button'
      }
    }).then(res => {
      if (res.value) {
        this.props.addToCart(quantity)
      }
    })
  }

  render() {
    const tableRow = this.props.tiers.map((tier, index) => {
      return <PriceTierRow tier={tier} key={index} addToCart={this.addToCart} />
    })

    return (
      <table className='price_table'>
        <thead>
          <tr className='price_table_row'>
            <th className='table_units'>Units</th>
            <th className='table_price'>Price / Unit</th>
            <th className='table_total'>Total</th>
            <th className='table_add_to_cart'>Add</th>
          </tr>
        </thead>
        {this.props.tiers.length && <tbody>{tableRow}</tbody>}
      </table>
    )
  }
}

export default PriceTiers
