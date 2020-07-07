import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="sidebar">
        <h1>sidebar</h1>
        <Link to="/">Home</Link>
        <Link to="/account">Account</Link>

      </div>
    );
  }
}
export default Sidebar;
