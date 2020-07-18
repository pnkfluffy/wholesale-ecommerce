import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";

import loading from "../../resources/images/loadingBig.svg"
/*components*/
import OrderCard from "./orderCard";

const mapStateToProps = (state) => ({
  state: state.reducer,
});

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        loading: false,
    }
  }

  isEmpty = (obj) => {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
  }

    displayProducts = () => {
    const products = this.props.state.order.products;
    return products.map(product => {
        return <OrderCard product = {product}/>
    })
    }

    deleteCart = () => {
        this.setState({
            loading: true
        })
        axios
            .delete("orders/" + this.props.state.order._id)
            .then(() => {
                this.props.dispatch({ type: 'ADD_ORDER', payload: {} });
                this.setState({
                    loading: false
                })
            })
            .catch((err) => {
                this.setState({
                    loading: false
                })
                console.log(err);
            });
    }

    render() {
        return (
            <div className="cart">
                <div className="top_cart_area">
                    <h1>cart</h1>
                    {(() => {
                        if(!this.isEmpty(this.props.state.order) && this.props.state.order.products[0])
                        {
                            return (
                                <div className="cart_button_area">
                                    <Link to="/buy"
                                          className= "cart_button">
                                        Buy ${this.props.state.order.total}
                                    </Link>
                                    <div className = "cart_button"
                                         onClick={this.deleteCart}>
                                        Delete Cart
                                    </div>
                                </div>
                            );
                        }
                    })()}
                </div>
                {(() => {
                //if cart is empty
                if (this.state.loading)
                {
                    return <img src= {loading}/>
                }
                else if(this.isEmpty(this.props.state.order) || !this.props.state.order.products[0])
                {
                  return <b>Your cart is empty! =( </b>
                }
                else {
                  return (
                      <div>
                        {this.displayProducts()}
                      </div>
                  )
                }
                })()}
            </div>
        );
        }
    }

export default connect(mapStateToProps)(Cart);
