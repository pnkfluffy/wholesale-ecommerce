import React from 'react'
import ReviewsCard from './reviewsCard'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'
import FirstPageIcon from '@material-ui/icons/FirstPage'
import { withRouter } from 'react-router-dom'

class UserReviews extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      page: 1,
      perPage: 5
    }
  }

  printReviews = () => {
    const items = this.state.page * this.state.perPage
    let reviews = []
    /* paginate */
    for (let i = items - this.state.perPage; i < items; i++) {
      if (this.props.reviews[i]) reviews.push(this.props.reviews[i])
    }
    if (reviews[0]) {
      return reviews.map(one => {
        console.log("ONE", one)
        return <ReviewsCard key={one._id} review={one} />
      })
    }
  }

  forward = () => {
    this.setState({
      page: this.state.page + 1
    })
  }

  backward = () => {
    this.setState({
      page: this.state.page - 1
    })
  }

  first = () => {
    this.setState({
      page: 1
    })
  }

  render () {
    return (
      <div className='user_reviews'>
        <div className='review_header_text'>
          Reviews
          <div>
            {(() => {
              if (
                this.state.page * this.state.perPage <
                this.props.reviews.length
              ) {
                return (
                  <div className='reviews_button' onClick={this.forward}>
                    <NavigateNextIcon />
                  </div>
                )
              }
            })()}
            {(() => {
              if (
                this.state.page > 1 &&
                this.state.page * this.state.perPage < this.props.reviews.length
              ) {
                return (
                  <div className='reviews_button' onClick={this.backward}>
                    <NavigateBeforeIcon />
                  </div>
                )
              }
            })()}
            {(() => {
              if (
                this.state.page * this.state.perPage >=
                  this.props.reviews.length &&
                this.state.page !== 1
              ) {
                return (
                  <div className='reviews_button' onClick={this.first}>
                    <FirstPageIcon />
                  </div>
                )
              }
            })()}
          </div>
        </div>
        <div>{this.printReviews()}</div>
      </div>
    )
  }
}

export default withRouter(UserReviews)
