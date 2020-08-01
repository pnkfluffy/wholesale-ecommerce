import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import StarIcon from '@material-ui/icons/Star'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'

const mapStateToProps = state => ({
  state: state.reducer
})

class ReviewsCard extends React.Component {
  constructor (props) {
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
          <Link to='/product/product._id' title='go to product'>
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

  goToProduct = () => {
    const url = '/product/' + this.props.review.product.toString()
    this.props.history.push(url)
  }

  fixDateFormat = () => {
    //original format: 2020-07-19T04:26:34.703Z
    const date = this.props.review.date
    let month = date.slice(5, 7)
    switch (month) {
      case '01':
        month = 'JAN'
        break
      case '02':
        month = 'FEB'
        break
      case '03':
        month = 'MAR'
        break
      case '04':
        month = 'APR'
        break
      case '05':
        month = 'MAY'
        break
      case '06':
        month = 'JUN'
        break
      case '07':
        month = 'JUL'
        break
      case '08':
        month = 'AUG'
        break
      case '09':
        month = 'SEP'
        break
      case '10':
        month = 'OCT'
        break
      case '11':
        month = 'NOV'
        break
      case '12':
        month = 'DEC'
        break
    }

    const day = date.slice(8, 10)
    const time = date.slice(11, 16)
    const fixed = month + ' ' + day + ' at ' + time
    return fixed
  }

  render () {
    const reviewDate = this.fixDateFormat()
    const onHomePage = Object.keys(this.props.match.params).length === 0
    const review = this.props.review.review
    return (
      <div className='reviews_card' onClick={this.goToProduct}>
        <div className='reviews_card_info'>
          <div className='reviews_card_info_user'>
            {this.props.review.userName}
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
