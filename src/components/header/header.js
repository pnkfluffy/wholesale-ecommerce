import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Header extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="header">
        <h1>header</h1>
        <Link to="/cart">Cart</Link>
        <Link to="/settings">Settings</Link>
        <Link to="/logout">Logout</Link>
      </div>
    );
  }
}
export default Header;
