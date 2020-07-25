import React from 'react'
import { connect } from 'react-redux'
import { GreenButton } from './materialButtons'
import ReviewsCard from './reviewsCard'

class UserReviews extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      page: 1
    }
  }

  printReviews = () => {
    const items = this.state.page * 3
    let reviews = []
    /* paginate */
    for (let i = items - 3; i < items; i++) {
      if (this.props.reviews[i]) reviews.push(this.props.reviews[i])
    }
    if (reviews[0]) {
      return reviews.map(one => {
        return <ReviewsCard review={one} />
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
      <div className='user_reviews'>
        <div className="home_header_text">Reviews</div>
        <div>
          {this.printReviews()}
        </div>
        <div className="user_reviews_buttons_area">
          {(() => {
            if (this.state.page > 1) {
              return (
                  <GreenButton
                      variant='contained'
                      className='reviews_button'
                      onClick={e => this.changePage(false)}
                  >
                    previous
                  </GreenButton>
              )
            }
          })()}
          {(() => {
          if (this.state.page * 3 >= this.props.reviews.length) {
            return (
                <div className='reviews_button_ghost'/>
            )
          }
          })()}
          {(() => {
            if (this.state.page == 1) {
              return (
                  <div className='reviews_button_ghost'/>
              )
            }
          })()}
          {(() => {
            if (this.state.page * 3 < this.props.reviews.length) {
              return (
                  <GreenButton
                      variant='contained'
                      className='reviews_button'
                      onClick={e => this.changePage(true)}
                  >
                    next
                  </GreenButton>
              )
            }
          })()}
        </div>
      </div>
    )
  }
}
export default UserReviews
