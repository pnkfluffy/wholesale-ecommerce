import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";

/*icons*/
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';

/*images*/
import logo from "../../resources/images/cbddy_logo_small.png";
import Categories from "./categories";

const mapStateToProps = (state) => ({
    state: state.reducer,
});

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        products: [],
    }
  }

  getAllProducts= () => {
        axios
            .get("products/all")
            .then(res => {
                console.log(res);
                this.props.dispatch({ type: 'UPDATE_PRODUCTS', payload: res.data })
            })
            .catch((err) => {
                console.log(err);
            });
  }

  render() {
    return (
      <div className="sidebar">
        <img src={logo} className="logo_sidebar"/>
        <div className="menu_sidebar">
            Menu<br/>
            <Link to="/"><HomeOutlinedIcon/> Home</Link><br/>
            <Link to="/account"><AccountCircleOutlinedIcon/> Account</Link>
        </div>
        <Categories />
        <div className="sidebar_footer">
          <p>
            all products contain -0.3% thc in accordance with the farm bill
          </p>
          <p>
            <a>customer support</a>,
            <a>privacy policy</a>, 
            <a>terms and conditions</a>,
            2020 Cbddy, All rights reserved
          </p>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Sidebar);
