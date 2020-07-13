import React from "react";
import { connect } from "react-redux";
import ProductCard from "./productCard";
import axios from "axios";

const mapStateToProps = (state) => ({
    state: state.reducer,
});

class Products extends React.Component {
    constructor(props) {
        super(props);
    }
    print_products = () => {
        let products = this.props.state.products.products;
        if (!products[0])
        {
            axios
                .get("products/all")
                .then(res => {
                    this.props.dispatch({ type: 'ADD_ALL_PRODUCTS', payload: res.data })
                })
                .catch((err) => {
                    console.log(err);
                });
            products = this.props.state.products.products
        }
        console.log(products);
        return products.map(product => {
            if (this.props.state.products.category === "All")
                return <ProductCard product = {product}/>;
            else if (this.props.state.products.category === product.category)
                return <ProductCard product = {product}/>;
            })
    }
    render() {
        return (
            <div className="products">
                <b>Discover New Products</b>
                <div className="products_area">
                    {this.print_products()}
                </div>
            </div>
        );
    }
}
export default connect(mapStateToProps)(Products);
