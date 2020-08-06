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
      title: 'Are you sure you want to logout?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      background: '#1E1F26',
      customClass: {
        confirmButton: 'swal_confirm_button',
        content: 'swal_text',
        title: 'swal_text'
      }
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
