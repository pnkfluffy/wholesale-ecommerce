import React from "react";
import {withRouter} from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import loading from "../../resources/images/loadingBig.svg"
import store from "../../redux/store";
import InputField from "../reuseable/InputField";
import {GreenButton} from "../reuseable/materialButtons";
import {compose} from "redux";

const mapStateToProps = (state) => ({
  state: state.reducer,
});

class GCPay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            paymentDone: false,
            ClientName: "",
            ClientLastName: "",
            ClientAddr1: "",
            ClientAddr2: "",
            ClientCity: "",
            ClientPostalCode: "",
            ClientState: "",
        }
    }

    componentDidMount() {
        this.setState({
            loading: true,
        })
        axios
            .get("gc/oneClient")
            .then(res => {
                    console.log(res.data)
                    this.setState({
                        loading: false,
                        ClientName: res.data.given_name,
                        ClientLastName: res.data.family_name,
                        ClientAddr1: res.data.address_line1,
                        ClientAddr2: res.data.address_line2,
                        ClientCity: res.data.city,
                        ClientPostalCode: res.data.postal_code,
                        ClientState: res.data.region
                    })
            })
            .catch((err) => {
                console.log(err);
                this.setState({
                    loading: false
                })
            });
    }

    collectPayment = e => {
        e.preventDefault();
        this.setState({
            loading: true
        })
        const fullName = this.state.ClientName + " " + this.state.ClientLastName;
        axios
            .post("gc/collectPayment/",
                {
                        delivery: {
                                    ClientFullName: fullName,
                                    ClientAddr1: this.state.ClientAddr1,
                                    ClientAddr2: this.state.ClientAddr2,
                                    city: this.state.ClientCity,
                                    state: this.state.ClientState,
                                    postal_code: this.state.ClientPostalCode,
                                    }
                    })
            .then(res => {
                this.setState({
                    loading: false,
                    paymentDone: true
                });


                //Clean the cart
                store.dispatch({ type: 'SET_CART', payload: [] })

                //Redirect to order page where all the information + receipt are available
                const url = "/order/" + res.data.order._id;
                this.props.history.push({
                    pathname: url,
                    state: {
                        payment: res.data.payment,
                        order: res.data.order
                    }
                })
            })
            .catch((err) => {
                console.log(err);
                this.setState({
                    loading: false,
                    paymentDone: false
                })
            });
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    render() {
        if (this.state.loading)
        {
            return (<img src = {loading}/>);
        }
        else if (!this.state.paymentDone) {
            return (
                <div>
                    <h1>Delivery Information</h1>
                    <form noValidate className="gc_form">
                        <InputField widthCSS="full"
                                    title="First Name"
                                    name="ClientName"
                                    value={this.state.ClientName}
                                    type="text" changeField={this.onChange}
                                    placeholder="" />
                        <InputField widthCSS="full"
                                    title="Family Name"
                                    name="ClientLastName"
                                    value={this.state.ClientLastName}
                                    type="text" changeField={this.onChange}
                                    placeholder="" />
                        <InputField widthCSS="full"
                                    title="Address Line 1"
                                    name="ClientAddr1"
                                    value={this.state.ClientAddr1}
                                    type="text" changeField={this.onChange}
                                    placeholder="" />
                        <InputField widthCSS="full"
                                    title="Address Line 2"
                                    name="ClientAddr2"
                                    value={this.state.ClientAddr2}
                                    type="text" changeField={this.onChange}
                                    placeholder="" />
                        <InputField widthCSS="full"
                                    title="City"
                                    name="ClientCity"
                                    value={this.state.ClientCity}
                                    type="text" changeField={this.onChange}
                                    placeholder="" />
                        <InputField widthCSS="full"
                                    title="State"
                                    name="ClientState"
                                    value={this.state.ClientState}
                                    type="text" changeField={this.onChange}
                                    placeholder="" />
                        <InputField widthCSS="full"
                                    title="Postal Code"
                                    name="ClientPostalCode"
                                    value={this.state.ClientPostalCode}
                                    type="text" changeField={this.onChange}
                                    placeholder="" />
                    </form>
                    <div className='cart_button_area'>
                        <GreenButton
                            variant='contained'
                            className='checkout_button'
                            onClick={this.collectPayment}
                        >
                            CHECK OUT: ${this.props.total}
                        </GreenButton>
                    </div>
                </div>
            );
        }
        else {
            return (
                <div>
                    <h1>Payment Done!</h1>
                    <p>Our payments take 3 days to get approved!</p>
                    <GreenButton
                        variant='contained'
                        className='checkout_button'
                        onClick={this.goToOrderPage}
                    >
                        CHECK PAYMENT STATUS
                    </GreenButton>
                </div>
            );
        }
    }
}
export default compose(
    withRouter,
    connect(mapStateToProps)
)(GCPay);
