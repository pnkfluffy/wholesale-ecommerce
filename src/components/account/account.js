import React from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const mapStateToProps = state => ({
    state: state.reducer
})

class Account extends React.Component {
  constructor(props) {
    super(props);
  }

  printPayments = () => {
    axios.get('/gc/payments/from')
         .then(res => console.log(res))
         .catch(err => console.log(err))
  }

  showUser = () => {
console.log(this.props.state.user)
  }
  render() {
    return (
      <div className="account">
        <h1>account</h1>
        <div onClick={this.printPayments}>
            PRINT PAYMENTS
        </div>
        <div onClick={this.showUser}>
            SHOW USER
        </div>
      </div>
    );
  }
}
export default connect(mapStateToProps)(Account);
