import React from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import ProductInOrderCard from "./productInOrderCard";
import GetInvoice from "./getInvoice";
import store from "../../redux/store";
import products from "../home/products";
import OrderInformation from "./orderInformation";

const mapStateToProps = state => ({
    state: state.reducer
})

class Order extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        axios.get('/gc/payments/from')
            .then(res => this.setState({
                                 payments: res.data
                            })
            )
            .catch(err => console.log(err))
    }

    printItems = products => {
        const productsWithInfo = products.map(product => {
            const productInfo = this.props.state.products.products.find(oneProduct => oneProduct._id === product.product);
            return <ProductInOrderCard productInfo = {productInfo} quantity = {product.quantity}></ProductInOrderCard>
        })
        return productsWithInfo;
    }

    redoOrder = order => {
        const productsWithInfo =  order.products.map(product =>
                                                                  {
                                                                    const allInfo = this.props.state.products.products.find(p => p._id === product.product)
                                                                    allInfo.quantity = product.quantity;
                                                                    return allInfo;
                                                                  })
        //add products to cart
            store.dispatch({ type: 'SET_CART', payload: productsWithInfo})

        //redirect to cart
        const url = "/cart";
        this.props.history.push(url)

        //save cart in db
        axios.post('/cart/', {cart: order.products})
             .catch(err => console.log(err))
    }

    render() {
        const payment = this.props.history.location.state.payment;
        const order = this.props.history.location.state.order;
        return (
            <div className="cart_page">
                <div className="cart">
                    <div className="each_order_title">
                        <h1>Order <div className="each_order_id">#{order._id}</div></h1>
                        <div className="each_order_title_right">
                            <div className="each_order_total">TOTAL: ${order.total}</div>
                            <div className="each_order_buttons">
                                <GetInvoice products = {this.props.state.products}
                                            payment = {payment}
                                            order = {order}/>
                                <div className="getReceiptButton"
                                     onClick={e => this.redoOrder(order)}
                                    >
                                    Redo Order
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='cart_body'>
                        {this.printItems(order.products)}
                    </div>
                </div>
                <OrderInformation payment={payment} order={order} />
            </div>
        );
    }
}
export default connect(mapStateToProps)(Order);
