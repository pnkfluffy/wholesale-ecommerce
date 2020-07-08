import React from "react";
import { connect } from "react-redux";
import axios from "axios";

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
      return <div>Log In with Google</div>;
    }

    return (
      <div>
        <div>
          WHEN YOU LOG IN WITH GOOGLE, YOU WILL BE REDIRECTED TO LOCALHOST:5000,
          MAKE SURE YOUR LATEST CHANGES ARE BUILT OR THEY WILL ONLY SHOW UP
          UNDER LOCALHOST:3000, and NOT 5000
        </div>
        <a href={`${this.state.devURI}/auth/login/google`}>
          Log In with Google
        </a>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Login);
