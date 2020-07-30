import React from 'react'
import { connect } from 'react-redux'
import FavoritesHeart from './src/components/reuseable/favoritesHeart'

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


class ProductImages extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      active: 0
    }
  }
  selectImage = index => {
    this.setState({ active: index })
  }

  changeStateValue = () => {}

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

    if (!this.props.images.length) {
      return null;
    }

    return (
      <div className='product_page_images'>
        <div className='product_page_image'>
          <img
            className='product_image'
            alt='product_image'
            src={this.props.images[this.state.active].url}
          />
          {this.props.productID && (
            <FavoritesHeart productID={this.props.productID} />
          )}
        </div>
        <div className='product_images_carousel'>{carouselImages}</div>
      </div>
    )
  }
}
export default connect(mapStateToProps)(ProductImages)
