import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import logo from "../../resources/images/cbddy_logo_small.png";
import googleIcon from "../../resources/images/google_button_icon.png";

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
        <div className="login_decoration decoration_left">
          <div className="decor_green decor_one" />
          <div className="decor_black decor_two" />
          <div className="decor_green decor_three" />
          <div className="decor_black decor_four" />
          <div className="decor_container">
            <div className="decor_black decor_five" />
            <div className="decor_black decor_six" />
          </div>
          <div className="decor_green decor_seven" />
        </div>
        <div className="login_decoration decoration_right">
          <div className="decor_black decor_ten" />
          <div className="decor_green decor_eleven" />
          <div className="decor_white decor_twelve" />
          <div className="decor_black decor_thirteen" />
          <div className="decor_green decor_fourteen" />
        </div>
        <div className="login_body">
          <div className="login_header">

          <img className="login_logo" src={logo} />
            <div className="login_wholesale">WHOLESALE</div>
          </div>
          <div className="login_fields">
            <a
              href={`${this.state.devURI}/auth/login/google`}
              className="google_login_button"
            >
              <img src={googleIcon} className="google_icon" />
              Sign In with Google
            </a>
          </div>
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
