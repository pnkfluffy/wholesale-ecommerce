import React from "react";
import { connect } from "react-redux";
import productImg from "../../resources/images/product_1.png"
import axios from "axios";

const mapStateToProps = (state) => ({
    state: state.reducer,
});

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        product: {},
        quantity: 0
    }
  }

componentDidMount() {
    //get product information from redux state
    const products = this.props.state.products.products
    const product = products.find(product => product._id === this.props.match.params.productID);

    //get quantity of product from orders redux state
    const order = this.props.state.order;
    let quantity = 0;
    if (order.products[0])
    {
        const productInOrder = order.products.find(product => product.product === this.props.match.params.productID);
        if (productInOrder)
            quantity = productInOrder.quantity;
    }
    this.setState({
        product: product,
        quantity: quantity
    })
}

  render() {
    return (
      <div className="product_page">
          <div className="image">
              <img src = {productImg} />
          </div>
          <div className="product_page_info">
              <div className="product_page_info_top">
                  <h2>{this.state.product.name}</h2>
                  <b>Quantity</b>{this.state.quantity}
              </div>
              <p>{this.state.product.description}</p>
          </div>
      </div>
    );
  }
}
export default connect(mapStateToProps)(Product);
