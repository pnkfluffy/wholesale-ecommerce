import React from 'react'
import { connect } from 'react-redux'
import { GreenButton } from '../reuseable/materialButtons'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import { Button } from '@material-ui/core';

const mapStateToProps = state => ({
  state: state.reducer
})

class Wishlist extends React.Component {
  addToWishlist = () => {
    this.props.dispatch({
      type: 'ADD_WISHLIST',
      payload: this.props.productID
    })
  }

  render () {
    let flag = true
    if (
      this.props.state.wishlist.findIndex(
        item => item === this.props.productID
      ) !== -1
    ) {
      flag = false
    }

    return (
      <>
        {flag ? (
          <GreenButton
            variant='outlined'
            className='wishlist_button'
            onClick={() => this.addToWishlist(this.props.productID)}
          >
            Add to Wishlist
          </GreenButton>
        ) : (
          <Button
            variant='outlined'
            className='wishlist_button'
            disabled={true}
            style={{ color: 'white', border: '2px solid rgba(256, 256, 256, 0.5)' }}
            startIcon={<CheckCircleOutlineIcon />}
          >
            In Wishlist!
          </Button>
        )}
      </>
    )
  }
}
export default connect(mapStateToProps)(Wishlist)
