import React from 'react'
import { connect } from 'react-redux'
import productImg from '../../resources/images/product_1.png'
import axios from 'axios'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import ProductQuantity from './productQuantity'
import UserReviews from './productUserReviews'
import { GreenButton } from '../reuseable/materialButtons'
import StarIcon from '@material-ui/icons/Star'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import StarHalfIcon from '@material-ui/icons/StarHalf'
import { addToCart } from '../cart/cartFunctions'

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

  getStars = stars => {
    let starsArray = []
    let tempStars = stars
    let emptyStars = 5 - tempStars
    if (emptyStars % 1) {
      emptyStars -= 1
    }
    while (tempStars > 1) {
      starsArray.push(<StarIcon></StarIcon>)
      tempStars -= 1
    }
    if (tempStars > 0.5) {
      starsArray.push(<StarIcon></StarIcon>)
    }
    if (tempStars > 0 && tempStars <= 0.5) {
      starsArray.push(<StarHalfIcon></StarHalfIcon>)
    }
    while (emptyStars > 0) {
      starsArray.push(<StarBorderIcon></StarBorderIcon>)
      emptyStars--
    }
    return starsArray
  }

  printStars = () => {
    let stars = 5
    if (this.props.state.reviews) {
      const reviews = this.props.state.reviews.filter(
        review => review.product === this.props.match.params.productID
      )
      if (reviews) {
        let media = 0
        reviews.forEach(review => {
          media = media + review.stars
        })
        stars = media / reviews.length
      }
    }
    return this.getStars(stars)
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
              <div>{this.printStars()}</div>
              <p>{this.state.product.description}</p>
              <h2 className='product_overview_title'>Overview</h2>
              <div className='product_metaData'></div>
              <div className='product_purchase'>
                <GreenButton
                  variant='contained'
                  className='product_button'
                  onClick={() => addToCart(this.state._id)}
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
        <UserReviews productID={this.props.match.params.productID} />
      </div>
    )
  }
}
export default connect(mapStateToProps)(Product)
