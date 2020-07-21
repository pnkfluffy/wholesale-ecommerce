import React from 'react'
import { Link } from 'react-router-dom'
import AddToCartButton from './addToCartButton'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import store from "../../redux/store";
import isFavorite from '../reuseable/isFavoriteProduct'

import productImg from '../../resources/images/product_1.png'

const mapStateToProps = state => ({
  state: state.reducer
})

class ProductCard extends React.Component {
  goToProduct = e => {
    const redirect_url = '/product/' + this.props.product._id.toString()
    e.stopPropagation()
    this.props.history.push(redirect_url)
  }

  setAsFavoriteProduct = e => {
    e.stopPropagation()
    const favoriteProducts = this.props.state.user.favorites;
    const productId = this.props.product._id;

    console.log("making post request")
    axios.post('/auth/addFavoriteProduct', this.props.product)
    .then(res =>{
      console.log("updating redux state")
      const FavoriteProductList = res.data.favorites;
     store.dispatch({ type: 'ADD_FAVORITE_PRODUCT', payload: FavoriteProductList })
   })
   .catch(err => {
     console.log(err)
   })
  }

  removeFromFavorite = e => {
    e.stopPropagation()
    const favoriteProducts = this.props.state.user.favorites;
    const productId = this.props.product._id;

    console.log("making delete request")
    // axios.post('/auth/deleteFavoriteProduct', this.props.product)
    //  .then(res =>{
    //    const FavoriteProductList = [res.data,
    //   ...this.props.state.user.favorites];
    //   store.dispatch({ type: 'DELETE_FAVORITE_PRODUCT', payload: FavoriteProductList })
    // })
   .catch(err => {
     console.log(err)
   })
  }
  
  //<FavoriteBorderIcon onClick={this.isFavorite} />

  render () {
    return (
      <div className='product_card'>
        <div className='product_card_image' >
          <img alt='product_image' src={productImg} onClick={this.goToProduct} />
          <div className='product_card_heart'>
    {
      isFavorite(this.props.state.user.favorites, this.props.product._id) ?
      <FavoriteIcon onClick={this.removeFromFavorite}/> :
        <FavoriteBorderIcon onClick={this.setAsFavoriteProduct}/>
        }
          </div>
        </div>
        
        <div className='product_name'>{this.props.product.name}</div>
        <div className='product_metadata'>
          <span>
            CBD
            <br />
            <sub>
              {/* ${this.props.product.metaData.cbd} */}
              92.3%
            </sub>
          </span>{' '}
          |
          <span>
            THC
            <br />
            <sub>
              {/* ${this.props.product.metaData.thc} */}
              12.34%
            </sub>
          </span>{' '}
          |
          <span>
            CT
            <br />
            <sub>
              {/* ${this.props.product.metaData.units.quantity} */}
              {/* ${this.props.product.metaData.units.unit} */}
              30CT
            </sub>
          </span>
        </div>
        <AddToCartButton product={this.props.product} />
      </div>
    )
  }
}
export default connect(mapStateToProps)(withRouter(ProductCard))
