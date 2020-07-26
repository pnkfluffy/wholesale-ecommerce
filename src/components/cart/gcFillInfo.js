import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import InputField from "../reuseable/InputField";
import {GreenButton} from "../reuseable/materialButtons";

const mapStateToProps = (state) => ({
  state: state.reducer,
});

class GCFillInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newClientName: "",
            newClientLastName: "",
            newClientEmail: "",
            newClientAddr: "",
            newClientCity: "",
            newClientPostalCode: "",
        }
    }

    addClients = e => {
        e.preventDefault();
        axios.post("/gc/addClient", this.state)
            .then(res => {
                console.log(res.data);
                /*set token to finish payment*/
                const token = res.data.token;
                localStorage.setItem("gc", token);
                window.open(res.data.url, "_self");
            })
            .catch(err => {
                    console.log(err)
                }
            );
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    render() {
        return (
            <div>
                <h1>Payment Information</h1>
                <form noValidate className="gc_form"
                                 onSubmit={this.addClients}>
                    <InputField widthCSS="gc_input"
                                title="First Name"
                                name="newClientName"
                                value={this.state.newClientName}
                                type="text" changeField={this.onChange}
                                placeholder="" />
                    <InputField widthCSS="gc_input"
                                title="Family Name"
                                name="newClientLastName"
                                value={this.state.newClientLastName}
                                type="text" changeField={this.onChange}
                                placeholder="" />
                    <InputField widthCSS="gc_input"
                                title="Email"
                                name="newClientEmail"
                                value={this.state.newClientEmail}
                                type="email" changeField={this.onChange}
                                placeholder="" />
                    <InputField widthCSS="gc_input"
                                title="Address"
                                name="newClientAddr"
                                value={this.state.newClientAddr}
                                type="text" changeField={this.onChange}
                                placeholder="" />
                    <InputField widthCSS="gc_input"
                                title="City"
                                name="newClientCity"
                                value={this.state.newClientCity}
                                type="text" changeField={this.onChange}
                                placeholder="" />
                    <InputField widthCSS="gc_input"
                                title="Postal Code"
                                name="newClientPostalCode"
                                value={this.state.newClientPostalCode}
                                type="text" changeField={this.onChange}
                                placeholder="" />
                </form>
                <div className='cart_button_area'>
                    <GreenButton
                        variant='contained'
                        className='checkout_button'
                        onClick={this.addClients}
                    >
                        CREATE ACCOUNT: ${this.props.total}
                    </GreenButton>
                </div>
            </div>
        );
        }
}

export default connect(mapStateToProps)(GCFillInfo);
