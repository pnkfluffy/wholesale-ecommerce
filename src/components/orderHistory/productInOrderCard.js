import React from 'react'
import { connect } from 'react-redux'
import productImg from '../../resources/images/product_1.png'
import { getPriceByQuantity } from "../reuseable/getPriceByQuantity";

const mapStateToProps = state => ({
    state: state.reducer
})

class ProductInOrderCard extends React.Component {
    constructor(props) {
        super(props);
    }
    render () {
        return (
            <div className='order_card'>
                <div className='order_card_image_container'>
                    <img
                        className='order_card_image'
                        src={productImg}
                        alt='product_image'
                    />
                </div>
                <div className='order_card_contents'>
                    <div className='order_content'>
                        <div className='order_card_product_name'>
                            {this.props.productInfo.name}
                        </div>
                        <div className='order_card_id'>
                            #{this.props.productInfo._id}
                        </div>
                    </div>
                    <div className='order_card_quantities'>
                        <b>Quantity {this.props.quantity}</b>
                        <b>price: getpricebyquantity</b>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps)(ProductInOrderCard)
