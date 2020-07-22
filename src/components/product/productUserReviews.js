import React from 'react'
import { connect } from 'react-redux'
import productImg from '../../resources/images/product_1.png'
import axios from 'axios'
import loading from '../../resources/images/loading.svg'
import CreateReview from './createReview'
import ReviewsCard from '../reuseable/reviewsCard'
import UserReviews from '../reuseable/userReviews'
import StarIcon from '@material-ui/icons/Star'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import StarHalfIcon from '@material-ui/icons/StarHalf'

const mapStateToProps = state => ({
  state: state.reducer
})

class ProductUserReviews extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      page: 1
    }
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
        review => review.product === this.props.productID
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

  printReviews = () => {
    const items = this.state.page * 5
    let reviews = []
    /* get only reviews for this product*/
    const reviewsThisProduct = this.props.state.reviews.filter(
      review => review.product === this.props.productID
    )

    /* paginate */
    if (reviewsThisProduct) {
      for (let i = items - 5; i < items; i++) {
        if (reviewsThisProduct[i]) reviews.push(reviewsThisProduct[i])
      }
      if (reviews[0]) {
        return reviews.map(one => {
          console.log(one)
          return <ReviewsCard review={one} />
        })
      }
    } else {
      return <p>No reviews for this product yet... Create one for us!</p>
    }
  }

  render () {
    return (
      <div className='user_reviews_area'>
        <div className='reviews_header'>
          <h1>Reviews</h1>
          <div className='reviews_average_stars'>{this.printStars()}</div>
        </div>
        <UserReviews
          reviews={this.props.state.reviews.filter(
            review => review.product === this.props.productID
          )}
        />
        <CreateReview productID={this.props.productID} />
      </div>
    )
  }
}
export default connect(mapStateToProps)(ProductUserReviews)
