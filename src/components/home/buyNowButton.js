import React from "react";
import { connect } from "react-redux";
import axios from "axios";

const mapStateToProps = (state) => ({
    state: state.reducer,
});

class BuyNowButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cartReadyToUse: false,
        }
    }

    componentDidMount() {
        //check if already has a cart not closed (this is not going to be here,
        // should have another component to do that on login
        if (this.props.state.order.length === 0)
        {
            //get last open cart from db (should be taken away once we have a little cart icon
            axios
                .get("orders/openOrder")
                .then(res => {
                    if (res.data.order)
                    {
                        this.props.dispatch({ type: 'ADD_ORDER', payload: res.data.order._id });
                        console.log(this.props.state.order)
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    createNewOrder = () => {
        console.log("create new order");
        const data = {
            productID: this.props.product._id
        }
        axios
            .post("orders/newOrder/" + this.props.product._id)
            .then(res => {
                this.props.dispatch({ type: 'ADD_ORDER', payload: res.data.order._id });
                this.setState({
                    cartReadyToUse: true,
                })
            })
            .catch((err) => {
                console.log(err);
            });
        console.log(this.props.state.order);
    }

    addToOrder = () => {
        console.log("add to order")
        const data = {
            productID: this.props.product._id
        }
        axios
            .post("orders/addProduct/" + this.props.state.order, data)
            .then(res => {
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err);
            });
    }

    addToCart = () => {
        //if there isn't an open cart, create one with the new item
        if (this.props.state.order.length === 0)
            this.createNewOrder();
        else {
            this.addToOrder();
        }
    }

    render() {
        return (
                <div className="product_buy"
                     onClick={this.addToCart}>
                    Buy Now {this.props.product.price}
                </div>
        );
    }
}
export default connect(mapStateToProps)(BuyNowButton);
