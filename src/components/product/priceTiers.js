import React from 'react'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'

const PriceTierRow = ({ tier }) => (
  <tr className='price_table_row'>
    <td className='table_units'>{tier.quantity}</td>
    <td className='table_price'>${tier.price}</td>
    <td className='table_total'>${tier.price * tier.quantity}</td>
    <td className='table_add_to_cart'>
      <AddShoppingCartIcon className="table_add_cart_icon" />
    </td>
  </tr>
)

class PriceTiers extends React.Component {
  render () {
    const tableRow = this.props.tiers.map((tier, index) => {
      return <PriceTierRow tier={tier} key={index} />
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
