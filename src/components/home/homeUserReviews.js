import React from 'react'
import { connect } from 'react-redux'
import ReviewsCard from '../reuseable/reviewsCard'
import UserReviews from '../reuseable/userReviews'

const mapStateToProps = state => ({
  state: state.reducer
})

class HomeUserReviews extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      page: 1
    }
  }

  printReviews = () => {
    const items = this.state.page * 5
    let reviews = []
    /* paginate */
    for (let i = items - 5; i < items; i++) {
      if (this.props.state.reviews[i]) reviews.push(this.props.state.reviews[i])
    }
    if (reviews[0]) {
      return reviews.map(one => {
        return <ReviewsCard review={one} key={one._id}/>
      })
    }
  }

  changePage = type => {
    let page = this.state.page
    if (type) page++
    else page--
    this.setState({
      page: page
    })
  }
  render () {
    return (
      <div className='user_reviews_area'>
        <UserReviews reviews={this.props.state.reviews} />
      </div>
    )
  }
}
export default connect(mapStateToProps)(HomeUserReviews)
