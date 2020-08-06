import React from 'react'
import { connect } from 'react-redux'
import blank_image from "../../resources/images/blank_image.jpg"

const mapStateToProps = state => ({
  state: state.reducer
})

const selectCSS = (index, activeIndex) =>{
  if (index === 0 && index !== activeIndex)
  {
    return 'static_carousel_image_container'
  } else if(index === 0 && index === activeIndex){
    return 'static_carousel_image_container_active'
  } else if(index !== activeIndex){
    return 'carousel_image_container'
  } else {
    return 'carousel_image_container_active'
  }
}

const CarouselImage = ({ image, select, index, activeIndex}) => {

  const imageCSS = selectCSS(index, activeIndex);
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
      active: 0
    }
  }
  
  selectImage = index => {
    this.setState({ active: index })
  }

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
    const image = (this.props.images.length && this.props.images[this.state.active].url) ? this.props.images[this.state.active].url : blank_image;
    return (
      <div className='product_page_images'>
        <div className='product_page_image'>
          <img
            className='product_image'
            alt={blank_image}
            src={image}
          />
        </div>
        <div className='product_images_carousel'>{carouselImages}</div>
      </div>
    )
  }
}
export default connect(mapStateToProps)(ProductImages)
