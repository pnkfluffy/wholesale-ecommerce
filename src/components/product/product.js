import React from "react";
import { connect } from "react-redux";
import productImg from "../../resources/images/product_1.png"
import axios from "axios";
import loading from "../../resources/images/loading.svg";

const mapStateToProps = (state) => ({
    state: state.reducer,
});

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        product: {},
        quantity: 0,
        loading: false
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
    increaseQuantity = () => {
        this.setState({
            loading: true
        });

        const data = {
            productID: this.state.product._id,
        }
        axios
            .post("/orders/addProduct/" + this.props.state.order._id, data)
            .then(res => {
                this.props.dispatch({ type: 'ADD_ORDER', payload: res.data });
                this.setState({
                    quantity: this.state.quantity + 1,
                    loading: false
                })
            })
            .catch((err) => {
                this.setState({
                    loading: false
                })
                console.log("error" + err);
            });
    }

    decreaseQuantity = () => {
        this.setState({
            loading: true
        });

        axios({
            method: 'delete',
            url: "/orders/deleteInQuantity/" + this.props.state.order._id,
            headers: {},
            data: {
                productID: this.state.product._id
            }
        }).then(res => {
            this.props.dispatch({ type: 'ADD_ORDER', payload: res.data });
            this.setState({
                quantity: this.state.quantity - 1,
                loading: false
            })
        })
            .catch((err) => {
                this.setState({
                    loading: false
                })
                console.log(err)
            });
    }

    changeQuantity = () => {
        this.setState({
            loading: true
        });

        const data = {
            productID: this.state.product._id,
            quantity: this.state.quantity
        }
        console.log(data);
        axios
            .post("/orders/changeQuantity/" + this.props.state.order._id, data)
            .then(res => {
                this.props.dispatch({ type: 'ADD_ORDER', payload: res.data });
                this.setState({
                    loading: false
                })
            })
            .catch((err) => {
                this.setState({
                    loading: false
                })
                console.log("error" + err);
            });
    }

    onSubmit = e => {
        e.preventDefault();
        if (this.state.quantity === "0")
            this.deleteProduct();
        else
            this.changeQuantity();
    };

    onChange = e => {
        this.setState({
            quantity: e.target.value
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
                  <div className="order_quantity_button" onClick={this.decreaseQuantity}>
                      -
                  </div>
                  <b>Quantity</b>
                  {(() => {
                      if(this.state.loading)
                      {
                          return <img src = {loading}/>
                      }
                      else
                      {
                          return (
                              <form noValidate onSubmit={this.onSubmit}>
                                  <input onChange={this.onChange}
                                         className="order_card_input"
                                         value={this.state.quantity}
                                         type="number" />
                              </form>
                          );
                      }
                  })()}
                  <div className="order_quantity_button" onClick={this.increaseQuantity}>
                      +
                  </div>
              </div>
              <p>{this.state.product.description}</p>
          </div>
      </div>
    );
  }
}
export default connect(mapStateToProps)(Product);
