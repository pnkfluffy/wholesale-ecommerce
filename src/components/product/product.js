import React from 'react'
import { connect } from 'react-redux'
import product_image_one from '../../resources/images/test/oil_all_1.jpg'
import product_image_two from '../../resources/images/test/oil_2500mg_1.jpg'
import product_image_three from '../../resources/images/test/oil_2500mg_2.jpg'
import productImg from '../../resources/images/product_1.png'
import axios from 'axios'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import ProductQuantity from './productQuantity'
import UserReviews from './productUserReviews'
import ProductImages from './productImages'
import ProductMetaData from './productMetaData'
import PriceTiers from './priceTiers'
import { addQuantityToCart } from '../reuseable/addQuantityToCart'
import { getPriceByQuantity } from '../reuseable/getPriceByQuantity'
import { GreenButton } from '../reuseable/materialButtons'

const mapStateToProps = state => ({
  state: state.reducer
})

class Product extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      product: {
        category: '',
        description: '',
        name: '',
        price: '',
        //  needs to be moved back up into product
        imageData: [],
        metaData: {
          cbd: {
            unit: '',
            quantity: ''
          },
          thc: {
            unit: '',
            quantity: ''
          },
          units: {
            unit: '',
            quantity: ''
          },
          weight: {
            unit: '',
            quantity: ''
          }
        },
        priceTiers: [
          { price: 10, quantity: 100 },
          { price: 8, quantity: 200 },
          { price: 7, quantity: 300 },
          { price: 6.5, quantity: 500 },
          { price: 5, quantity: 1000 }
        ],
        _id: ''
      },
      quantity: 1
    }
  }

  componentDidMount () {
    axios
      .get('/products/' + this.props.match.params.productID)
      .then(res => {
        console.log('res', res.data)
        this.setState({
          product: res.data
        })
      })
      .catch(err => {
        console.log('error' + err)
      })
  }

  changeQuantity = quantity => {
    this.setState({ quantity })
  }

  render () {
    const product = this.state.product;
    const totalPrice = getPriceByQuantity(
      product.priceTiers,
      this.state.quantity,
      product.price
    )
    return (
      <div className='product_page'>
        <div className='product_page_main'>
          <div className='product_page_top'>
            <ProductImages images={product.imageData} />
            <div className='product_page_info'>
              <div className='product_info'>
                <div className='product_description_container'>
                  <div className='product_page_info_top'>
                    <div className='product_title'>
                      {product.name}
                    </div>
                    <ProductQuantity
                      productID={this.props.match.params.productID}
                      quantity={this.state.quantity}
                      changeQuantity={this.changeQuantity}
                    />
                  </div>
                  <PriceTiers
                    tiers={product.priceTiers}
                    product={this.state}
                  />
                </div>
                <div className='product_overview_container'>
                  <div className='product_overview_title'>Overview</div>
                  <ProductMetaData metaData={product.metaData} />
                </div>
              </div>
              <div className='product_purchase'>
                <GreenButton
                  variant='contained'
                  className='product_button'
                  onClick={() => addQuantityToCart(this.state.product)}
                >
                  Add To Cart
                </GreenButton>
                <div className='product_price'>
                  $<div className='price_price'>{totalPrice}</div>
                </div>
              </div>
            </div>
          </div>
          <p>{product.description}</p>
        </div>
        <UserReviews productID={this.props.match.params.productID} />
      </div>
    )
  }
}
export default connect(mapStateToProps)(Product)
