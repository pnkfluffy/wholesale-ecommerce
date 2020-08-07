import React from 'react'
import { connect } from 'react-redux';
import { GreenButton } from '../reuseable/materialButtons'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

const mapStateToProps = state => ({
  state: state.reducer
})

class Wishlist extends React.Component {
  constructor(props) {
    super(props)
  }

  addToWishlist = () => {
    this.props.dispatch({
      type: 'ADD_WISHLIST',
      payload: this.props.productID
    })
  }

  render() {
    let flag = true
    if (this.props.state.wishlist.findIndex(item => item === this.props.productID) !== -1) {
      flag = false
    }

    return (
      <>
        {flag ? (
          <GreenButton
            variant='contained'
            className='wishlist_button'
            onClick={() => this.addToWishlist(this.props.productID)}
          >
            Add to Wishlist
          </GreenButton>
        ) : (
            <GreenButton
              variant='contained'
              className='wishlist_button'
              disabled={true}
              style={{ color: 'white' }}
            >
              <CheckCircleOutlineIcon />
           In Wishlist!
            </GreenButton>
          )}
      </>
    )
  }
}
export default connect(mapStateToProps)(Wishlist)
