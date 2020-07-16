import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";

import loading from "../../resources/images/loadingBig.svg"
import GCFillInfo from "./gcFillInfo";
import GCPay from "./gcPay";

const mapStateToProps = (state) => ({
  state: state.reducer,
});

class GoCardless extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            hasClientID: false,
            hasMandate: false
        }
    }

    componentDidMount() {
        this.setState({
            loading: true
        })
        this.checkClientCGID();
        this.checkClientMandate();
    }

    checkClientCGID = () => {
        axios
            .get("gc/checkClientID")
            .then(res => {
                if (res.data)
                {
                    this.setState({
                        hasClientID: true,
                        loading: false
                    })
                }
                else {
                    this.setState({
                        loading: false
                    })
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    checkClientMandate = () => {
        axios
            .get("gc/checkClientMandate")
            .then(res => {
                if (res.data)
                {
                    this.setState({
                        hasMandate: true,
                        loading: false
                    })
                }
                else {
                    this.setState({
                        loading: false
                    })
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    confirmAccount = () => {
        let params = new URLSearchParams(window.location.href);
        if (params.has("http://localhost:3000/buy?redirect_flow_id")) {
            this.setState({
                loading: true
            })
            const id = localStorage.getItem("gc");
            console.log(id)
            axios.post("/gc/completeRedirect", {id: id})
                .then(res => {
                    this.setState({
                        hasMandate: true,
                        hasClientID: true,
                        loading: false
                    })
                    window.open("http://localhost:3000/buy", "_self");
                    localStorage.removeItem("gc");
                })
                .catch(err => {
                    console.log(err)
                    this.setState({
                        loading: false
                    })
                    window.open("http://localhost:3000/buy", "_self");
                });
        } else if (localStorage.getItem("gc")) {
            const url = "https://pay-sandbox.gocardless.com/flow/" + localStorage.getItem("gc");
            window.open(url, "_self");
        }
    }

    render() {
        return (
            <div className="buy">
                <div className="process_buy">
                    {(() => {
                        if (this.state.loading) {
                            return (<img src = {loading} />)
                        }
                        else if (!this.state.hasClientID) {
                            return (<GCFillInfo />)
                        }
                        else if (!this.state.hasMandate){
                            this.confirmAccount();
                        }
                        else {
                            return <GCPay />
                        }
                    })()}
                </div>
                <div className="confirm_order">
                    <h2>Products In order</h2>
                </div>
            </div>
        );
        }
}

export default connect(mapStateToProps)(GoCardless);
