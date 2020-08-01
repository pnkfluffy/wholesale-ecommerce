import React from 'react'
import { connect } from 'react-redux'
import FavoriteProductCard from './favoriteProductCard'
import OrderHistory from '../orderHistory/orderHistory'
const mapStateToProps = state => ({
  state: state.reducer
})

class Account extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      favoriteProductList: this.props.state.favorites
    }
  }

  render() {
    let favorites = this.props.state.products.products.map(product => {
      if (this.props.state.products.products.indexOf(product._id) !== -1) {
        return (
          <FavoriteProductCard
            product={product}
            key={product._id}
            images={product.imageData}
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
            <div className='page_subheader'>Favorites</div>
            {this.props.state.favorites.length ? (
              favorites
            ) : (
                <div className='no_items_message'>
                  Seems like you haven't favorited any items yet. Add favorites by
                  clicking the heart on product page!
                </div>
              )}
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Account)
