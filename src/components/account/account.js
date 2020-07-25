import React from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import FavoriteProductCard from './favoriteProductCard'

const mapStateToProps = state => ({
    state: state.reducer
})

class Account extends React.Component {
  constructor(props) {
    super(props);
  }

  printPayments = () => {
    axios.get('/gc/payments/from')
         .then(res => console.log(res))
         .catch(err => console.log(err))
  }

  render() {
    const favoriteProductList = this.props.state.user.favorites;
    const allProductsList = this.props.state.products.products;

    const renderProduct = allProductsList.map((product) => {
      if (favoriteProductList.indexOf(product._id) !== -1)
        {
          return (
          <FavoriteProductCard
          product={product}
          key={product._id}
          />
          )
        }
      })
    return (
      <div>
        <h1>account</h1>
        <div className="account_container">
        <div className="section_container" onClick={this.printPayments}>
            Order History
        </div>
        <div className="section_container">
        <div>Favorites</div>
        {renderProduct}
        </div>
      </div>
      </div>
    );
  }
}
export default connect(mapStateToProps)(Account);
