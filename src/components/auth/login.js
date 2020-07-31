import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import logo from '../../resources/images/cbddy_logo_small.png'
import shajs from 'sha.js'
import googleIcon from '../../resources/images/google_button_icon.png'

const mapStateToProps = state => ({
  state: state.reducer
})

class Login extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      username: '',
      password: '',
    }
  }

  login = event => {
    event.preventDefault()
    console.log(this.state);
    axios.post('/auth/login', {
      username: this.state.username,
      password: this.state.password
    }).then(res => {
      console.log(res.status);
      window.location.href = '/'
    }).catch(err => {
      console.log(err);
      
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

  render () {
    return (
      <div className='login'>
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
          <div className='login_fields'>
            <form onSubmit={this.login}>
              <input type="text" placeholder="email" onChange={this.inputUsername}/>
              <input type="text" placeholder="password" onChange={this.inputPassword}/>
              <input type="submit" />
            </form>
          </div>
        </div>
        <div className='login_footer sidebar_footer_text'>
          <a className='light_green' href='tel:5551234567'>
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
