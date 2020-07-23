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

  showUser = () => {
console.log(this.props.state.user)
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
      <div className="account">
        <h1>account</h1>
        <div onClick={this.printPayments}>
            Order History
        </div>
        <div onClick={this.showUser}>
            Show User
        </div>
        <div>
        <div>Favorites</div>
        {renderProduct}
        </div>
      </div>
    );
  }
}
export default connect(mapStateToProps)(Account);
