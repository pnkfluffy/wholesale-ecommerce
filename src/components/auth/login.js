import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import logo from "../../resources/images/cbddy_logo_small.png";
import { GreenButton } from "../reuseable/materialButtons";

const mapStateToProps = (state) => ({
  state: state.reducer,
});

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      devURI: "",
      loaded: false,
    };
  }

  componentDidMount() {
    axios
      .get("/auth/login-uri")
      .then((res) => {
        this.setState({
          devURI: res.data,
          loaded: true,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  inputUsername = (event) => {
    this.setState({
      username: event.target.value,
    });
  };

  render() {
    if (!this.state.loaded) {
      return <div>AHHHH NOT LOADED FUCK, SHIT, FUCK</div>;
    }

    return (
      <div className="login">
        <div className="decoration decoration_left" />
        <div className="decoration decoration_right" />
        <div className="login_center"></div>
        <div className="login_logo">
          <img src={logo} />
        </div>
        <div className="login_fields">
          <a href={`${this.state.devURI}/auth/login/google`}>
            <GreenButton variant="contained">Login with Google</GreenButton>
          </a>
        </div>
        <div className="login_footer">
          customer support, privacy policy, terms and conditions, 2020 &#169;
          Cbddy, All rights reserved.
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Login);
