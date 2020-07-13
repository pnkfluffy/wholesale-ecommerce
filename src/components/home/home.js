import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Products from "./products";
import UserReviews from "./userReviews";

class Home extends React.Component {
  constructor(props) {
    super(props);
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
export default Home;
