import React from 'react'
import { connect } from 'react-redux'
import CreateReview from '../reuseable/createReview'
import ReviewsCard from '../reuseable/reviewsCard'
import UserReviews from '../reuseable/userReviews'

const mapStateToProps = state => ({
  state: state.reducer
})

class ProductUserReviews extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      page: 1,
      boughtProduct: false
    }
  }

  componentDidMount () {
    this.setState({
      boughtProduct: true
    })
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
          // console.log(one)
          return <ReviewsCard review={one} key={one._id}/>
        })
      }
    } else {
      return <p>No reviews for this product yet... Create one for us!</p>
    }
  }

  boughtProduct = () => {
    const orders = this.props.state.orders
    if (orders)
    {
      let i = 0;
      while (i < orders.length)
      {
        let find = orders[i].products.find(product => product.productId === this.props.productID)
        if (find)
          return true;
        i++;
      }
    }
    return false;
  }

  render () {
    return (
      <div className='user_reviews_area'>
        <UserReviews
          reviews={this.props.state.reviews.filter(
            review => review.product === this.props.productID
          )}
        />
        {(() => {
          if (this.boughtProduct()) {
            return <CreateReview productID={this.props.productID} />
          }
          else {
            return <p>Buy this product to leave a review!</p>
          }
        })()}
      </div>
    )
  }
}
export default connect(mapStateToProps)(ProductUserReviews)
