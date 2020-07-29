import React from "react";
import axios from "axios";
import store from "../../redux/store";

import {GreenButton} from "../reuseable/materialButtons";
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import { connect } from "react-redux";

import InputField from "../reuseable/InputField";
import loading from "../../resources/images/loadingBig.svg"

const USPS = require('usps-webtools');

const mapStateToProps = (state) => ({
  state: state.reducer,
});

class GCPay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            paymentDone: false,
            readyToPay: false,
            ClientFirstName: "",
            ClientLastName: "",
            ClientAddr1: "",
            ClientAddr2: "",
            ClientCity: "",
            ClientPostalCode: "",
            ClientState: "",
            err: {
                ClientFirstName: "",
                ClientLastName: "",
                ClientAddr1: "",
                ClientAddr2: "",
                city: "",
                postal_code: "",
                state: "",
                invalidAddr: "",
            }
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
                        ClientFirstName: res.data.given_name,
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

    collectPayment = async e => {
        e.preventDefault();
        this.setState({
            loading: true
        })
        const fullName = this.state.ClientFirstName + " " + this.state.ClientLastName;
        const delivery = {
            ClientFirstName: this.state.ClientFirstName,
            ClientLastName: this.state.ClientLastName,
            ClientFullName: fullName,
            ClientAddr1: this.state.ClientAddr1,
            ClientAddr2: this.state.ClientAddr2,
            city: this.state.ClientCity,
            state: this.state.ClientState,
            postal_code: this.state.ClientPostalCode,
        }
        axios
            .post("gc/collectPayment/",
                {
                    delivery: delivery
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
               if(err.response.data.errors){
                   this.setState({
                       err: err.response.data.errors,
                       loading: false,
                   })
                   console.log(this.state.err);
               }
            });
    }

    checkZipCode = zip => {
        const host = 'http://production.shippingapis.com/ShippingAPI.dll';
        const userName = "314CBDDY8065";

        if (zip.length === 5 && !isNaN(zip))
        {
            const usps = new USPS({
                server: host,
                userId: userName,
                ttl: 10000 //TTL in milliseconds for request
            });

            usps.cityStateLookup(zip, (err, result) => {
                if (result) {
                    let city = result.city.toLowerCase();
                    city = city.replace(/^./, city[0].toUpperCase())
                    this.setState({
                        ClientCity: city,
                        ClientState: result.state,
                        err: {
                            ClientPostalCode: "",
                        }
                    })
                }
                else {
                    this.setState({
                        err: {
                            postal_code: "invalid postal code"
                        }
                    })
                }
            });
        }
    }

    onChange = e => {
        //check city and state for postal code
        if (e.target.name === "ClientPostalCode")
        {
            const zip = e.target.value;
            this.checkZipCode(zip)
        }
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
                <div className="gcpay_form_area">
                    <h1>Delivery Information</h1>
                    <div className="gcpay_center">
                        <form noValidate className="gc_form">
                            <div className="gcpay_input">
                                <InputField widthCSS="full"
                                            title="First Name *"
                                            name="ClientFirstName"
                                            value={this.state.ClientFirstName}
                                            type="text" changeField={this.onChange}
                                            placeholder="" />
                                <span className="err">{this.state.err.ClientFirstName}</span>
                            </div>
                            <div className="gcpay_input">
                                <InputField widthCSS="full"
                                            title="Family Name *"
                                            name="ClientLastName"
                                            value={this.state.ClientLastName}
                                            type="text" changeField={this.onChange}
                                            placeholder="" />
                                <span className="err">{this.state.err.ClientLastName}</span>
                            </div>
                            <div className="gcpay_input">
                                <InputField widthCSS="full"
                                            title="Postal Code *"
                                            name="ClientPostalCode"
                                            value={this.state.ClientPostalCode}
                                            type="number"
                                            changeField={this.onChange}
                                            placeholder="" />
                                <span className="err">{this.state.err.postal_code}</span>
                            </div>
                            <div className="gcpay_input">
                                <InputField widthCSS="full"
                                            title="Address Line 1 *"
                                            name="ClientAddr1"
                                            value={this.state.ClientAddr1}
                                            type="text" changeField={this.onChange}
                                            placeholder="" />
                                <span className="err">{this.state.err.ClientAddr1}</span>
                                <span className="err">{this.state.err.invalidAddr}</span>
                            </div>
                            <div className="gcpay_input">
                            <InputField widthCSS="full"
                                        title="Address Line 2"
                                        name="ClientAddr2"
                                        value={this.state.ClientAddr2}
                                        type="text" changeField={this.onChange}
                                        placeholder="" />
                            <span className="err">{this.state.err.ClientAddr2}</span>
                            </div>
                            <div className="gcpay_input">
                                <InputField widthCSS="full"
                                            title="City *"
                                            name="ClientCity"
                                            value={this.state.ClientCity}
                                            type="text" changeField={this.onChange}
                                            placeholder="" />
                                <span className="err">{this.state.err.city}</span>
                            </div>
                            <div className="gcpay_input">
                                <InputField widthCSS="full"
                                            title="State *"
                                            name="ClientState"
                                            value={this.state.ClientState}
                                            type="text" changeField={this.onChange}
                                            placeholder="" />
                                <span className="err">{this.state.err.state}</span>
                            </div>
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
                </div>
            );
        }
        else {
            return (
                <div>
                    <h1>Payment Done!</h1>
                </div>
            );
        }
    }
}
export default compose(
    withRouter,
    connect(mapStateToProps)
)(GCPay);
