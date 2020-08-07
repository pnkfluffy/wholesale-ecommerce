import React from 'react'
import { connect } from 'react-redux'
import FavoriteProductCard from './favoriteProductCard'
import OrderHistory from './orderHistory/orderHistory'

const mapStateToProps = state => ({
  state: state.reducer
})

class Account extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {    
    let wishlistProductList = this.props.state.wishlist.map(wishlistItem => {
      let productInfo = this.props.state.products.products.find(product => {
        if (product._id === wishlistItem && wishlistItem !== null){
          console.log("product", product);
          return (product);
        }})
      console.log("productInfo", productInfo);
      // return (
      //   // <FavoriteProductCard
      //   //   product={productInfo}
      //   //   key={productInfo._id}
      //   //   images={productInfo.imageData}
      //   // />
      // )
    })

    return (
      <div>
        <div className='account_container'>
          <div className='section_container'>
            <div className='page_subheader'>Order History</div>
            <OrderHistory />
          </div>
          <div className='section_container'>
            <div className='page_subheader'>Wishlist</div>
            {this.props.state.wishlist.length ? (
              wishlistProductList
            ) : (
                <div className='no_items_message'>
                  Your wishlist is empty. Add products to your wishlist by
                  clicking on "Add to wishlist" on product page!
                </div>
              )}
            </div>
          </div>
        </div>
        )
  }
}

export default connect(mapStateToProps)(Account)
