import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Login from "./components/auth/login";
import Logout from "./components/auth/logout";
import ErrorPage404 from "./components/error/error404";
import Sidebar from "./components/sidebar/sidebar";
import Header from "./components/header/header";
import Home from "./components/home/home";
import Account from "./components/account/account";
import Cart from "./components/cart/cart";
import Settings from "./components/settings/settings";
import Product from "./components/product/product";
import Order from "./components/account/orderHistory/order"
import AdminError404 from './components/error/adminError404'
import GoCardless from './components/cart/goCardless'
import CustomCheckout from './components/cart/custom/goCardless'
import Admin from './components/admin/Setup'
import { connect } from "react-redux";



const mapStateToProps = state => ({
  state: state.reducer
})

class App extends React.Component {
  render() {
    if (!this.props.state.loaded) {
      return <div className='App'></div>
    }
    let loggedInRoutes = (
      <Router>
        <div className='background'>
          <Sidebar />
          <div className='body'>
            <Header />
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/account' component={Account} />
              <Route path='/cart' component={Cart} />
              <Route path='/buy' component={GoCardless} />
              <Route path='/custom-buy' component={CustomCheckout} />
              <Route path='/settings' component={Settings} />
              <Route path='/logout' component={Logout} />
              <Route path='/product/:productID' component={Product} />
              <Route path='/order/:orderID' component={Order} />
              <Route path='/*' component={ErrorPage404} />
            </Switch>
          </div>
        </div>
      </Router>
    )
    let loggedOutRoutes = (
      <Router>
        <Switch>
          <Route exact path='/' component={Login} />
          <Route
            exact
            path='/admin'
            render={props => <Admin history={this.props.history} {...props} />}
          />
          <Route exact path='/*' component={ErrorPage404} />
        </Switch>
      </Router>
    )
    let adminRoutes = (
      <Router>
        <Switch>
          <Route
            exact
            path='/'
            render={props => <Admin history={this.props.history} {...props} />}
          />
          <Route exact path='/*' >
            <Redirect to="/" />
          </Route>
        </Switch>
      </Router>
    )

    let routes = loggedOutRoutes
    if (this.props.state.user.email) routes = loggedInRoutes
    if (localStorage.getItem('sig')) routes = adminRoutes

    return (
      <div className='App'>
        {routes}
      </div>
    )
  }
}

export default connect(mapStateToProps)(App)
