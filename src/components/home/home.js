import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Home extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="header">
        <h1>HOME</h1>
      </div>
    );
  }
}
export default Home;
