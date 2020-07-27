import React from 'react'
import Cookies from 'universal-cookie'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './components/auth/login'
import Logout from './components/auth/logout'
import ErrorPage404 from './components/error/error404'
import AdminError404 from './components/error/adminError404'
import Sidebar from './components/sidebar/sidebar'
import Header from './components/header/header'
import Home from './components/home/home'
import Account from './components/account/account'
import Cart from './components/cart/cart'
import GoCardless from './components/cart/goCardless'
import Settings from './components/settings/settings'
import Product from './components/product/product'
import Order from './components/orderHistory/order'
import OrderHistory from './components/orderHistory/orderHistory'
import Admin from './components/admin/Setup'

const cookie = new Cookies()

const mapStateToProps = state => ({
  state: state.reducer
})

class App extends React.Component {
  render () {
    if (!this.props.state.loaded) {
      return <div className='App'></div>
    }
    let loggedInRoutes = (
      <div className='background'>
        <Sidebar />
        <div className='body'>
          <Header />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/account' component={Account} />
            <Route exact path='/cart' component={Cart} />
            <Route exact path='/buy' component={GoCardless} />
            <Route exact path='/settings' component={Settings} />
            <Route exact path='/logout' component={Logout} />
            <Route exact path='/product/:productID' component={Product} />
            <Route exact path='/order/:orderID' component={Order} />
            <Route exact path='/orderHistory' component={OrderHistory} />
            <Route exact path='/*' component={ErrorPage404} />
          </Switch>
        </div>
      </div>
    )
    let loggedOutRoutes = (
      <Switch>
        <Route exact path='/' component={Login} />
        <Route
          exact
          path='/admin'
          render={props => <Admin history={this.props.history} {...props} />}
        />
        <Route exact path='/*' component={ErrorPage404} />
      </Switch>
    )
    let adminRoutes = (
      <Switch>
        <Route
          exact
          path='/admin'
          render={props => <Admin history={this.props.history} {...props} />}
        />
        <Route exact path='/*' component={AdminError404} />
      </Switch>
    )

    let routes = loggedOutRoutes
    if (this.props.state.user.name) routes = loggedInRoutes
    if (cookie.get('sig')) routes = adminRoutes

    return (
      <div className='App'>
        <Router>{routes}</Router>
      </div>
    )
  }
}

export default connect(mapStateToProps)(App)
