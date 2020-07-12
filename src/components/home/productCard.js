import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import productImg from "../../resources/images/product_1.png"

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
                <div className="product_buy">
                    Buy Now {this.props.product.price}
                </div>
            </div>
        );
    }
}
export default ProductCard;
