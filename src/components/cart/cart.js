import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Cart extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="cart">
        <h1>cart</h1>
      </div>
    );
  }
}
export default Cart;
