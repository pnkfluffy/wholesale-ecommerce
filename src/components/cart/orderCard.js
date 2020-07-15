import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import Header from "../header/header";

import productImg from "../../resources/images/product_1.png"
import loading from "../../resources/images/loading.svg"

const mapStateToProps = (state) => ({
    state: state.reducer,
});

class OrderCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            productPrice: 0,
            price: 0,
            quantity: "",
            loading: false,
            loadingDelete: false
        }
    }

    componentDidMount() {
        axios
            .get("products/" + this.props.product.product)
            .then(res => {
                this.setState({
                    name: res.data.name,
                    productPrice: res.data.price,
                    price: res.data.price * this.props.product.quantity,
                    quantity: this.props.product.quantity,
                })
            })
            .catch((err) => {
                console.log(err)
            });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.product !== prevProps.product)
        {
            axios
                .get("products/" + this.props.product.product)
                .then(res => {
                    this.setState({
                        name: res.data.name,
                        productPrice: res.data.price,
                        price: res.data.price * this.props.product.quantity,
                        quantity: this.props.product.quantity,
                        loading: false,
                        loadingDelete: false
                    })
                })
                .catch((err) => {
                    console.log(err)
                });
        }
    }

    increaseQuantity = () => {
        const data = {
            productID: this.props.product.product
        }

        this.setState({
            loading: true
        });

        axios
            .post("orders/addProduct/" + this.props.state.order._id, data)
            .then(res => {
                this.props.dispatch({ type: 'ADD_ORDER', payload: res.data });
            })
            .catch((err) => {
                console.log("error" + err);
            });
    }

    decreaseQuantity = () => {
        this.setState({
            loading: true
        });

        axios({
            method: 'delete',
            url: "orders/deleteInQuantity/" + this.props.state.order._id,
            headers: {},
            data: {
                productID: this.props.product.product
            }
        }).then(res => {
                this.props.dispatch({ type: 'ADD_ORDER', payload: res.data });
            })
            .catch((err) => {
                console.log(err)
            });
    }

    deleteProduct = () => {
        this.setState({
            loadingDelete: true
        });

        axios({
            method: 'delete',
            url: "orders/deleteWholeProduct/" + this.props.state.order._id,
            headers: {},
            data: {
                productID: this.props.product.product
            }
        }).then(res => {
            this.props.dispatch({ type: 'ADD_ORDER', payload: res.data });
        })
            .catch((err) => {
                console.log(err)
            });
    }
    render() {
            return (
                <div className="order_card">
                    <img src = {productImg}/>
                    <div className="order_content">
                        <h2>{this.state.name}</h2>
                        <div className="manage_quantity">
                            <div className="order_quantity_button" onClick={this.decreaseQuantity}>
                                -
                            </div>
                            <b>quantity</b>
                            {(() => {
                                if(this.state.loading)
                                {
                                    return <img src = {loading}/>
                                }
                                else
                                {
                                    return (
                                        <b>{this.state.quantity}</b>
                                        );
                                }
                            })()}
                            <div className="order_quantity_button" onClick={this.increaseQuantity}>
                                +
                            </div>
                        </div>
                        <b>price {this.state.price}</b>
                        {(() => {
                            if(this.state.loadingDelete) {
                                return <img src = {loading}/>
                            }
                            else {
                                return <div className="delete_product_button" onClick={this.deleteProduct}>Delete</div>
                            }
                        })()}
                    </div>
                </div>
            );
        }
}

export default connect(mapStateToProps)(OrderCard);