import React from 'react'
import { connect } from 'react-redux'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'

const mapStateToProps = state => ({
  state: state.reducer
})

class ProductQuantity extends React.Component {

  render () {
    const quantity = this.props.quantity ? this.props.quantity : "";
    return (
      <div className='product_quantity'>
        <input
          onChange={e => this.props.changeQuantity(e.target.value)}
          className='product_quantity_input'
          value={this.props.quantity}
          type='number'
        />

        <div className='quantity_arrows'>
          <div
            className='order_quantity_button'
            onClick={() => this.props.changeQuantity(this.props.quantity + 1)}
          >
            <ExpandLessIcon />
          </div>
          <div
            className='order_quantity_button'
            onClick={() => this.props.changeQuantity(this.props.quantity - 1)}
          >
            <ExpandLessIcon className='icon_upsidedown' />
          </div>
        </div>
      </div>
    )
  }
}
export default connect(mapStateToProps)(ProductQuantity)
