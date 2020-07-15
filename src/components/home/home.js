import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Products from "./products";
import UserReviews from "./userReviews";
import axios from "axios";

const mapStateToProps = (state) => ({
    state: state.reducer,
});

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

componentDidMount() {
    //get last open cart from db
    axios
        .get("orders/openOrder")
        .then(res => {
            if (res.data.order)
            {
                console.log("GOT ORDER")
                this.props.dispatch({ type: 'ADD_ORDER', payload: res.data.order });
            }
        })
        .catch((err) => {
            console.log(err);
        });
}

  render() {
    return (
      <div className="home">
        <Products />
        <UserReviews />
      </div>
    );
  }
}
export default connect(mapStateToProps)(Home);
