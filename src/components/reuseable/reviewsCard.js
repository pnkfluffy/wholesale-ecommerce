import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import StarIcon from '@material-ui/icons/Star'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import moment from 'moment'

const mapStateToProps = state => ({
  state: state.reducer
})

class ReviewsCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      productName: ''
    }
  }

  getProductName = () => {
    /* get product name related to this review */
    if (this.props.state.products.products) {
      const products = this.props.state.products.products
      const product = products.find(
        product => product._id === this.props.review.product
      )
      console.log('getproduct', product)
      if (product) {
        return (
          <Link to={`/product/${product._id}`} title='go to product'>
            <div className='reviews_card_info_line'>{product.name}</div>
          </Link>
        )
      } else {
        return (
          <div className='reviews_card_info_line'>"product unavailable"</div>
        )
      }
    }
  }

  printStars = () => {
    let i = 0
    let stars = []
    while (i < this.props.review.stars) {
      stars.push(<StarIcon fontSize='inherit' key={i}></StarIcon>)
      i++
    }
    while (i < 5) {
      stars.push(<StarBorderIcon fontSize='inherit' key={i}></StarBorderIcon>)
      i++
    }
    return stars
  }

  getUserFromEmail = () => {
    const name = this.props.review.userName
    const endOfName = name.indexOf(' ')
    if (endOfName === -1) return name
    return name.slice(0, endOfName)
  }

  render() {
    const reviewDate = moment(this.props.review.date).format('ll')
    const onHomePage = Object.keys(this.props.match.params).length === 0
    const review = this.props.review.review
    const userName = this.getUserFromEmail()

    return (
      <div className='reviews_card'>
        <div className='reviews_card_info'>
          <div className='reviews_card_info_user'>
            {userName}
            <div className='reviews_card_info_date'>{reviewDate}</div>
          </div>
          <div className='reviews_card_info_rating'>
            {onHomePage && this.getProductName()}
            <div className='reviews_card_stars'>{this.printStars()}</div>
          </div>
        </div>
        {review && <div className='reviews_card_review'>{review}</div>}
      </div>
    )
  }
}
export default compose(withRouter, connect(mapStateToProps))(ReviewsCard)
