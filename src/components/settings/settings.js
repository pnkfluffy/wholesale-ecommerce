import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Settings extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="settings">
        <h1>settings</h1>
      </div>
    );
  }
}
export default Settings;
