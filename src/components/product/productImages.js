import React from 'react';
import { connect } from 'react-redux'

import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import isFavorite from '../reuseable/isFavoriteProduct'
import setAsFavoriteProduct from '../reuseable/setAsFavoriteProduct'
import removeFavoriteProduct from '../reuseable/removeFavoriteProduct'

const mapStateToProps = state => ({
  state: state.reducer
})

const CarouselImage = ({ image, select, index, activeIndex }) => {
  const imageCSS =
    index !== activeIndex
      ? 'carousel_image_container'
      : 'carousel_image_container_active'
  return (
    <div className={imageCSS} onClick={() => select(index)}>
      <img className='carousel_image' src={image} alt='single_product_image' />
    </div>
  )
}

class ProductImages extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      active: 0,
     favoriteProducts: this.props.state.user.favorites
    }
  }

  selectImage = index => {
    this.setState({ active: index })
  }

  // componentDidMount(){
  //   isFavorite(this.props.state.user.favorites, this.props.productID)
  // }

  render () {
    const carouselImages = this.props.images.map((image, index) => (
      <CarouselImage
        image={image.url}
        select={this.selectImage}
        key={index}
        index={index}
        activeIndex={this.state.active}
      />
    ))

    return (
      <div className='product_page_images'>
        <div className='product_page_image'>
          <img
            className='product_image'
            alt='product_image'
            src={this.props.images[this.state.active].url}
          />
          <div className='product_card_heart'>
            {
            isFavorite(this.state.favoriteProducts, this.props.productID) ?
            <FavoriteIcon onClick={() => removeFavoriteProduct(this.props.productID)}/> :
            <FavoriteBorderIcon onClick={() => setAsFavoriteProduct(this.props.productID)}/>
            }
          </div>
        </div>
        <div className='product_images_carousel'>{carouselImages}</div>
      </div>
    )
  }
}
export default connect(mapStateToProps)(ProductImages)
