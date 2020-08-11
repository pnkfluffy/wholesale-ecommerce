import React from 'react'
import { connect } from 'react-redux'
import WishlistProductCard from './wishlistProductCard'
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
        if (product._id === wishlistItem && wishlistItem !== null) {
          // console.log("product", product);
          return (product);
        }
      })
      if (productInfo) {
        return (
          <WishlistProductCard
            product={productInfo}
            id={productInfo._id}
            key={productInfo._id}
            images={productInfo.imageData}
          />
        )
      }
      else {
        return (
          <WishlistProductCard
            product={null}
            id={wishlistItem}
          />
        )
      }
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
            {wishlistProductList.length ? (
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
