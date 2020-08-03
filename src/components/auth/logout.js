import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import Swal from 'sweetalert2'

const mapStateToProps = (state) => ({
  state: state.reducer,
});

class Logout extends React.Component {

  componentDidMount(){
    Swal.fire({
      title: `Logout?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#59BA47',
    }).then(res => {
      if (res.value) {
        axios.get("/auth/logout").then((res) => {
          window.location.href = "/";
        });
      }
      else {
        this.props.history.push('/')
      }
    })
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
