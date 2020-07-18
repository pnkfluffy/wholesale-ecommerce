import React from 'react'
import { connect } from 'react-redux'
import productImg from '../../resources/images/product_1.png'
import axios from 'axios'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import ProductQuantity from './productQuantity'
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
        metaData: {
          cbd: '',
          thc: '',
          units: {
            unit: '',
            quantity: ''
          },
          weight: ''
        },
        priceTiers: []
      },
      loading: false
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

  onSubmit = e => {
    e.preventDefault()
    if (this.state.quantity === '0') this.deleteProduct()
    else this.changeQuantity()
  }

  onChange = e => {
    this.setState({
      quantity: e.target.value
    })
  }

  render () {
    return (
      <div className='product_page'>
        <div className='product_page_main'>
          <div className='product_page_top'>
            <div className='product_page_images'>
              <div className='product_page_image'>
                <img
                  className='product_image'
                  alt='product_image'
                  src={productImg}
                />
                <div className='product_card_heart'>
                  <FavoriteBorderIcon onClick={this.favoriteProduct} />
                </div>
              </div>
              <div className='product_images_carousel'></div>
            </div>
            <div className='product_page_info'>
              <div className='product_page_info_top'>
                <h2>{this.state.product.name}</h2>
                <ProductQuantity
                  productID={this.props.match.params.productID}
                />
              </div>
              <p>{this.state.product.description}</p>
              <h2 className='product_overview_title'>Overview</h2>
              <div className='product_metaData'></div>
              <div className='product_purchase'>
                <GreenButton
                  variant='contained'
                  className='product_button'
                  onClick={this.addToCart}
                >
                  Add To Cart
                </GreenButton>
                <div className='product_price'>
                  $ {this.state.product.price}
                </div>
              </div>
            </div>
          </div>
          <div className='product_page_pricetiers'>x price if you buy x</div>
        </div>
        <div className='user_reviews'></div>
      </div>
    )
  }
}
export default Product
