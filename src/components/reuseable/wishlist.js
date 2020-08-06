import React from 'react'
import { connect } from 'react-redux';
import { GreenButton } from '../reuseable/materialButtons'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

const mapStateToProps = state => ({
  state: state.reducer
})

class Wishlist extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isWishlist: true
    }
  }

  addToWishlist = () => {
    this.setState({ isWishlist: false })
      this.props.dispatch({
        type: 'ADD_WISHLIST',
        payload: this.props.productID
      })
    } 
    // else {
    //   this.props.dispatch({
    //     type: 'DELETE_WISHLIST',
    //     payload: this.props.productID
    //   })
    // }
  

  isWishlist = () => {
    const Wishlist = this.props.state.wishlist
    const productID = this.props.productID
    function checkIfIsWishlist (result) {
      return result === productID
    }
    if (Wishlist.find(checkIfIsWishlist)) {
      return true
    } else {
      return false
    }
  }

  // componentDidMount = () => {
  //   console.log("before setstate");
  //   this.setState({ isWishlist: this.isWishlist() })
  // }

 render () {
   return (
   <div>
    {this.state.isWishlist ? (
      <GreenButton
        variant='contained'
        className='product_button'
        onClick={() => this.addToWishlist(this.props.productID)}
      >
        Add To Wishlist
      </GreenButton>
    ) : (
        <GreenButton
          variant='contained'
          className='product_button'
          disabled={true}
          style={{color: 'white'}}
        >
          <CheckCircleOutlineIcon />
           in Wishlist!
        </GreenButton>
      )}
    </div>
   )
 }
}
export default connect(mapStateToProps)(Wishlist)
