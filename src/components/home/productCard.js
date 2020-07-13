import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import productImg from "../../resources/images/product_1.png"
import BuyNowButton from "./buyNowButton";

class ProductCard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="product_card">
                <img src = {productImg}/>
                <div className="product_name">
                    {this.props.product.name}
                </div>
                <div className="products_metadata">
                    CBD | THC | CT
                </div>
                <BuyNowButton product = {this.props.product}/>
            </div>
        );
    }
}
export default ProductCard;
