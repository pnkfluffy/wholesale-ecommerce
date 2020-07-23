import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";

import loading from "../../resources/images/loadingBig.svg"
import store from "../../redux/store";

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
                store.dispatch({ type: 'SET_CART', payload: {} })
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
            [e.target.id]: e.target.value,
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
                    <h1>Confirm Delivery Information</h1>
                    <form noValidate className="gc_form"
                          onSubmit={this.collectPayment}>
                        <label>
                            First Name
                            <input onChange={this.onChange}
                                   value={this.state.ClientName}
                                   id="ClientName"
                                   type="text" />
                        </label>
                        <label>
                            Family Name
                            <input onChange={this.onChange}
                                   value={this.state.ClientLastName}
                                   id="ClientLastName"
                                   type="text" />
                        </label>
                        <label>
                            Address Line 1
                            <input onChange={this.onChange}
                                   value={this.state.ClientAddr1}
                                   id="ClientAddr1"
                                   type="text" />
                        </label>
                        <label>
                            Address Line 2
                            <input onChange={this.onChange}
                                   value={this.state.ClientAddr2}
                                   id="ClientAddr2"
                                   type="text" />
                        </label>
                        <label>
                            City
                            <input onChange={this.onChange}
                                   value={this.state.ClientCity}
                                   id="ClientCity"
                                   type="text" />
                        </label>
                        <label>
                            City
                            <input onChange={this.onChange}
                                   value={this.state.ClientState}
                                   id="ClientState"
                                   type="text" />
                        </label>
                        <label>
                            Postal Code
                            <input onChange={this.onChange}
                                   value={this.state.ClientPostalCode}
                                   id="ClientPostalCode"
                                   type="text" />
                        </label>
                        <button> Buy! </button>
                    </form>
                </div>
            );
        }
        else {
            return (<h1>"Payment Done!"</h1>);
        }
    }
}

export default connect(mapStateToProps)(GCPay);
