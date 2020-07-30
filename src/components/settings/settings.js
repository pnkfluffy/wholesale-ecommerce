import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Settings extends React.Component {
  constructor(props) {
    super(props);
  }

  showUser = () => {
  console.log(this.props.state.user)
  }

  render() {
    return (
      <div className="settings">
        <h1>settings</h1>
        <div onClick={this.showUser}>
            Show User
        </div>
      </div>
    );
  }
}
export default Settings;
