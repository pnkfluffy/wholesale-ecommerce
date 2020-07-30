import React from 'react'
import { connect } from 'react-redux'
import { GreenButton } from './materialButtons'
import ReviewsCard from './reviewsCard'
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';

class UserReviews extends React.Component {
  constructor(props) {
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
      return reviews.map((one, index) => {
        return <ReviewsCard key={index} review={one} />
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

  render() {

    return (
      <div className='user_reviews'>
        <div className="review_header_text">
          Reviews
          <div>
            {(() => {
              if (this.state.page * 3 < this.props.reviews.length) {
                return (
                  <div className='reviews_button' onClick={this.forward}>
                    <NavigateNextIcon />
                  </div>
                )
              }
            })()}
            {(() => {
              if (this.state.page > 1 && this.state.page * 3 < this.props.reviews.length) {
                return (
                  <div
                    className='reviews_button'
                    onClick={this.backward}
                  >
                    <NavigateBeforeIcon />
                  </div>
                )
              }
            })()}
            {(() => {
              if (this.state.page * 3 === this.props.reviews.length) {
                return (
                  <div
                    className='reviews_button'
                    onClick={this.first}
                  >
                    <NavigateBeforeIcon />
                  </div>
                )
              }
            })()}
          </div>

        </div>
        <div>
          {this.printReviews()}
        </div>

      </div>
    )
  }
}
export default UserReviews


// {(() => {
//   if (this.state.page * 3 >= this.props.reviews.length) {
//     return (
//         <div className='reviews_button_ghost'/>
//     )
//   }
//   })()}
//   {(() => {
//     if (this.state.page == 1) {
//       return (
//           <div className='reviews_button_ghost'/>
//       )
//     }
//   })()}