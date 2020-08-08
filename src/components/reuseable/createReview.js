import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import StarIcon from '@material-ui/icons/Star'
import { GreenButton } from './materialButtons'
import loading from '../../resources/images/loading.svg'
import store from '../../redux/store'
import Swal from 'sweetalert2'

const mapStateToProps = state => ({
  state: state.reducer
})

class CreateReview extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      newReview: '',
      stars: 5,
      loading: false,
    }
  }

  createReview = () => {
    this.setState({
      loading: true
    })
    axios.post('/api/reviews/newReview/' + this.props.productID, this.state)
      .then(res => {
        this.setState({
          loading: false,
          review: '',
          stars: 5
        })
        const reviews = res.data

        store.dispatch({ type: 'ADD_REVIEWS', payload: reviews })
      })
      .catch(err => {
        Swal.fire({
          text: err.response.data,
          background: '#1E1F26',
          customClass: {
            confirmButton: 'swal_confirm_button'
          }
        })
        this.setState({
          loading: false
        })
      })
  }

  onSubmit = e => {
    e.preventDefault()
    this.createReview()
  }

  editStars = index => {
    this.setState({
      stars: index
    })
  }

  onChange = e => {
    this.setState({
      review: e.target.value
    })
  }

  render() {

    let i = 0
    let stars = []
    while (i < this.state.stars) {
      const index = i + 1
      stars.push(
        <StarIcon onClick={() => this.editStars(index)} key={i}></StarIcon>
      )
      i++
    }
    while (i < 5) {
      const index = i + 1
      stars.push(
        <StarBorderIcon onClick={() => this.editStars(index)} key={i}></StarBorderIcon>
      )
      i++
    }

    const char_limit = 180;

    return (
      <form className='create_review' noValidate onSubmit={this.onSubmit}>
        <div className="counter_container">
          <div className='create_review_header'>Leave a review:</div>
          <div className="character_counter"
          >{this.state.review && (this.state.review.length <= char_limit) ? (char_limit - this.state.review.length) : char_limit}</div>
        </div>
        <textarea
          className='add_to_reviews_input'
          onChange={this.onChange}
          value={this.state.review}
          rows='3'
          maxlength={char_limit}
        ></textarea>

        <div className='create_review_bottom'>
          <div className='create_review_rating'>{stars}</div>

          {this.state.loading ? (
            <img alt='loading' src={loading} />
          ) : (
              <GreenButton
                variant='contained'
                className='create_review_button'
                onClick={this.onSubmit}
              >
                submit
              </GreenButton>
            )}
        </div>
      </form>
    )
  }
}
export default connect(mapStateToProps)(CreateReview)
