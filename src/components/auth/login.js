import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import logo from '../../resources/images/cbddy_logo_small.png'
import AuthField from './AuthField'
import shajs from 'sha.js'
import MailOutlineIcon from '@material-ui/icons/MailOutline'
import VpnKeyIcon from '@material-ui/icons/VpnKey'
import { LightGreenButton } from '../reuseable/materialButtons'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import { classes } from '../reuseable/materialButtons'

const mapStateToProps = state => ({
  state: state.reducer
})

class Login extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      username: '',
      password: '',
      error: false,
      snackbarOpen: false,
      snackbarSeverity: 'success',
      snackbarMessage: ''
    }
  }

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    this.setState({ snackbarOpen: false })
  }

  login = event => {
    event.preventDefault()
    // console.log(this.state)
    axios
      .post('/auth/login', {
        username: this.state.username,
        password: this.state.password
      })
      .then(res => {
        // console.log(res.status)
        window.location.href = '/'
      })
      .catch(err => {
        this.setSnackbar('error', 'Invalid Credentials')
        // console.log(err)
      })
  }

  setSnackbar = (severity, message) => {
    this.setState({
      snackbarOpen: true,
      snackbarSeverity: severity,
      snackbarMessage: message
    })
  }

  inputUsername = event => {
    this.setState({
      username: event.target.value
    })
  }

  inputPassword = event => {
    this.setState({
      password: event.target.value
    })
  }
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render () {
    return (
      <div className='login'>
        <div className={classes.root}>
          <Snackbar
            open={this.state.snackbarOpen}
            severity={this.state.snackbarSeverity}
            autoHideDuration={4500}
            onClose={this.handleClose}
          >
            <Alert
              elevation={6}
              variant='filled'
              onClose={this.handleClose}
              color={this.state.snackbarSeverity}
            >
              {this.state.snackbarMessage}
            </Alert>
          </Snackbar>
        </div>
        <div className='login_decoration decoration_left'>
          <div className='decor_green decor_one' />
          <div className='decor_black decor_two' />
          <div className='decor_green decor_three' />
          <div className='decor_black decor_four' />
          <div className='decor_container'>
            <div className='decor_black decor_five' />
            <div className='decor_black decor_six' />
          </div>
          <div className='decor_green decor_seven' />
        </div>
        <div className='login_decoration decoration_right'>
          <div className='decor_black decor_ten' />
          <div className='decor_green decor_eleven' />
          <div className='decor_white decor_twelve' />
          <div className='decor_black decor_thirteen' />
          <div className='decor_green decor_fourteen' />
        </div>
        <div className='login_body'>
          <div className='login_header'>
            <img className='login_logo' src={logo} alt='login_logo' />
            <div className='login_wholesale'>WHOLESALE</div>
          </div>
          <form className='login_form' onSubmit={this.login}>
            <AuthField
              widthCSS='full'
              name='username'
              value={this.state.username}
              type='text'
              changeField={this.onChange}
              icon={<MailOutlineIcon className='auth_icon' />}
              placeholder='Email@example.com'
              error={this.state.error}
            />
            <AuthField
              widthCSS='full'
              name='password'
              value={this.state.password}
              type='password'
              changeField={this.onChange}
              icon={<VpnKeyIcon className='auth_icon' />}
              placeholder='Password'
              error={this.state.error}
            />
            <input type='submit' className='no_display' />
            <LightGreenButton
              variant='contained'
              className='full'
              onClick={this.login}
            >
              LOGIN
            </LightGreenButton>
          </form>
          <span className='register_text'>
            {' '}
            no account? contact us at{' '}
            <a className='light_green' href='tel:7205916284'>
              (720)591-6284
            </a>
          </span>
        </div>
        <div className='login_footer sidebar_footer_text'>
          <a className='light_green' href='tel:7205916284'>
            customer support
          </a>
          ,{' '}
          <a className='light_green' href='https://cbddy.com/privacy-policy/'>
            privacy policy
          </a>
          ,{' '}
          <a
            className='light_green'
            href='https://cbddy.com/terms-and-conditions/'
          >
            terms and conditions
          </a>
          &#169;2020 <a className='dark_green'>Cbddy</a>, All rights reserved.
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Login)
