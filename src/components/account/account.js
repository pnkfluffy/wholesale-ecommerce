import React from 'react'
import { connect } from 'react-redux'
import FavoriteProductCard from './favoriteProductCard'
import OrderHistory from './orderHistory/orderHistory'

const mapStateToProps = state => ({
  state: state.reducer
})

class Account extends React.Component {
  render () {
    let favorites = this.props.state.favorites.map(favorite => {
      let productInfo = this.props.state.products.products.find(
        product => product._id === favorite
      )
      return (
        <FavoriteProductCard
          product={productInfo}
          key={productInfo._id}
          images={productInfo.imageData}
        />
      )
    })

    return (
      <div>
        <div className='account_container'>
          <div className='section_container'>
            <div className='page_subheader'>Order History</div>
            <OrderHistory />
          </div>
          <div className='section_container'>
            <div className='page_subheader'>Favorites</div>
            <div className='favorites_container'>
              {this.props.state.favorites.length ? (
                favorites
              ) : (
                <div className='no_items_message'>
                  Seems like you haven't favorited any items yet. Add favorites
                  by clicking the heart on product page!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Account)
