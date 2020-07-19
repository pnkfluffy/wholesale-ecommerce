import React from "react";
import { connect } from "react-redux";
import Products from "./products";
import HomeUserReviews from "./homeUserReviews";

const mapStateToProps = state => ({
  state: state.reducer
})

class Home extends React.Component {

  render () {
    return (
      <div className='home'>
        <Products />
        <HomeUserReviews />
      </div>
    )
  }
}
export default connect(mapStateToProps)(Home)
