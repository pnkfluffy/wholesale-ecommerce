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

  render() {
    return (
      <div className="account">
        <h1>account</h1>
        <Link to='/orderHistory'>
            Order Hirstory
        </Link>
      </div>
    );
  }
}
export default connect(mapStateToProps)(Account);
