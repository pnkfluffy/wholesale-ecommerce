import React from "react";
import axios from "axios";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
  state: state.reducer,
});

class Logout extends React.Component {
  componentDidMount() {
    axios.get("/auth/logout").then((res) => {
      window.location.href = '/'
    });
  }

  render() {
    return (
      <div>
        <h3 className="logout_message">LOGGING YOU OUT...</h3>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Logout);