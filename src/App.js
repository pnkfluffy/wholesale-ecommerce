import React from 'react';
import { connect } from "react-redux";
import Login from './components/login'
import Logout from './components/logout'
import Admin from './components/AdminSetup/Setup'
import ErrorPage404 from './components/error404'
import Home from './components/home'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


const mapStateToProps = (state) => ({
  state: state.reducer,
});

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    if (!this.props.state.loaded) {
      return (
        <div className="App" >

        </div>
      )
    }
    let loggedInRoutes = (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/logout" component={Logout} />
        <Route exact path="/*" component={ErrorPage404} />
      </Switch>
    )
    let loggedOutRoutes = (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/*" component={ErrorPage404} />
      </Switch>
    )

    let routes = this.props.state.user.name ? loggedInRoutes : loggedOutRoutes

    return (
      <div className="App" >
        <Router>
          {routes}
          <Switch>
          <Route exact path="/admin" render={(props) => <Admin history={this.props.history} {...props} />}/>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);