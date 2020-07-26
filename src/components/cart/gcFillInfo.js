import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";

import loading from "../../resources/images/loadingBig.svg"

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
            [e.target.id]: e.target.value,
        })
    }

    render() {
        return (
            <div>
                <h1>Fill Information</h1>
                <form noValidate className="gc_form"
                                 onSubmit={this.addClients}>
                    <label>
                        First Name
                        <input onChange={this.onChange}
                               value={this.state.newClientName}
                               id="newClientName"
                               type="text" />
                    </label>
                    <label>
                        Family Name
                        <input onChange={this.onChange}
                               value={this.state.newClientLastName}
                               id="newClientLastName"
                               type="text" />
                    </label>
                    <label>
                        Email
                        <input onChange={this.onChange}
                               value={this.state.newClientEmail}
                               id="newClientEmail"
                               type="email" />
                    </label>
                    <label>
                        Address
                        <input onChange={this.onChange}
                               value={this.state.newClientAddr}
                               id="newClientAddr"
                               type="email" />
                    </label>
                    <label>
                        City
                        <input onChange={this.onChange}
                               value={this.state.newClientCity}
                               id="newClientCity"
                               type="email" />
                    </label>
                    <label>
                        Postal Code
                        <input onChange={this.onChange}
                               value={this.state.newClientPostalCode}
                               id="newClientPostalCode"
                               type="email" />
                    </label>
                    <button> Create Client </button>
                </form>
            </div>
        );
        }
}

export default connect(mapStateToProps)(GCFillInfo);
