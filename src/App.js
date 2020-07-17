import React from "react";
import { connect } from "react-redux";
import Login from "./components/auth/login";
import Logout from "./components/auth/logout";
import ErrorPage404 from "./components/error/error404";
import Sidebar from "./components/sidebar/sidebar";
import Header from "./components/header/header";
import Home from "./components/home/home";
import Account from "./components/account/account";
import Cart from "./components/cart/cart";
import GoCardless from "./components/cart/goCardless";
import Settings from "./components/settings/settings";
import Product from "./components/product/product";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const mapStateToProps = (state) => ({
  state: state.reducer,
});

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.state.loaded) {
      return <div className="App"></div>;
    }
    let loggedInRoutes = (
      <div className="background">
        <Sidebar />
        <div className="body">
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/account" component={Account} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/buy" component={GoCardless}/>
            <Route exact path="/settings" component={Settings} />
            <Route exact path="/logout" component={Logout} />
            <Route exact path="/product/:productID" component={Product}/>
            <Route exact path="/*" component={ErrorPage404} />
          </Switch>
        </div>
      </div>
    );
    let loggedOutRoutes = (
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/*" component={ErrorPage404} />
      </Switch>
    );

    let routes = this.props.state.user.name ? loggedInRoutes : loggedOutRoutes;

    return (
      <div className="App">
        <Router>{routes}</Router>
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);
