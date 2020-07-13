import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import productImg from "../../resources/images/product_1.png"

class BuyNowButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
                <div className="product_buy">
                    Buy Now {this.props.product.price}
                </div>
        );
    }
}
export default BuyNowButton;
