import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import { RedButton, GreenButton } from '../reuseable/materialButtons'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import InputField from '../reuseable/InputField'
import Swal from 'sweetalert2'
import loading from '../../resources/images/loading.svg'

import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import { classes } from '../reuseable/materialButtons'
import ChangePayment from './changePayment'
import store from "../../redux/store";

const mapStateToProps = state => ({
  state: state.reducer
})

class Settings extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      openTab: '',
      originalEmail: '',
      newEmail: '',
      oldPass: '',
      newPass: '',
      newPassConfirm: '',
      ClientAddr1: '',
      ClientAddr2: '',
      ClientCity: '',
      ClientPostalCode: '',
      ClientState: '',
      emailButtonActive: true,
      pswdButtonActive: true,
      paymentInfo: {},
      err: {
        email: false,
        oldPass: false,
        newPass: false
      },
      snackbarOpen: false,
      snackbarSeverity: 'success',
      snackbarMessage: ''
    }
    let params = new URLSearchParams(window.location.href)

    const url = `${this.props.state.devURI}/settings?redirect_flow_id`
    if (params.has(url)) {
      this.completeSetPayment(params.get(url));
    }
  }

  completeSetPayment = redirect => {
    this.props.history.replace('/settings')
    axios
        .post('/api/gc/completeRedirect', {redirect: redirect})
        .then(res => {
            if (!this.state.props.hasMandate)
              store.dispatch({
                type: 'YES_MANDATE'
              })
            Swal.fire({
              title: '<span class="swal_title"> SUCCESS',
              text: "Your payment method has been updated!",
              icon: 'success',
              background: '#1E1F26',
              customClass: {
                confirmButton: 'swal_confirm_button'
              }
            })
        })
        .catch(err => {
          Swal.fire({
            title: '<span class="swal_title"> ERROR',
            text: "Something went wrong trying to change you payment method, please try again!",
            icon: 'error',
            background: '#1E1F26',
            customClass: {
              confirmButton: 'swal_confirm_button'
            }
          })
        })
  }

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    this.setState({ snackbarOpen: false })
  }

  setSnackbar = (severity, message) => {
    this.setState({
      snackbarOpen: true,
      snackbarSeverity: severity,
      snackbarMessage: message
    })
  }

  showUser = () => {
    // console.log(this.props.state.user)
  }

  clearFields = () => {
    //  {!} IMPORT ADDRESS FROM CLIENT ADDRESS
    this.setState({
      originalEmail: '',
      newEmail: '',
      newPass: '',
      ClientAddr1: '',
      ClientAddr2: '',
      ClientCity: '',
      ClientPostalCode: '',
      ClientState: ''
    })
  }

  openTab = tab => {
    this.clearFields()
    if (this.state.openTab === tab) {
      this.setState({ openTab: '' })
    } else {
      this.setState({ openTab: tab })
    }
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  // editEmail = () => {
  //   axios.post('/auth/edit-email', { email: this.state.newEmail })
  //     .then(async res => {
  //       store.dispatch({ type: 'UPDATE_EMAIL', payload: this.state.newEmail })
  //       this.setState({
  //         originalEmail: this.state.newEmail,
  //         newEmail: '',
  //         emailButtonActive: false,
  //         openTab: ''
  //       })
  //       this.setSnackbar("success", "Your email has been updated");
  //       await axios.get('/auth/logout')
  //       window.location.href = '/'
  //     })
  //     .catch(error => {
  //       // console.log(error.response.data)
  //       if (error.response && error.response.data) {
  //         Swal.fire({
  //           title: '<span class="swal_title"> ERROR',
  //           text: error.response.data || "an error has occurred",
  //           icon: 'error',
  //           background: '#1E1F26',
  //           customClass: {
  //             confirmButton: 'swal_confirm_button'
  //           }
  //         })
  //         this.setState({
  //           err: {
  //             email: true
  //           }
  //         })
  //       }
  //     })
  // }

  editPass = () => {
    axios
      .post('/auth/edit-password', {
        oldPass: this.state.oldPass,
        newPass: this.state.newPass,
        newPassConfirm: this.state.newPassConfirm
      })
      .then(res => {
        // console.log(res.data)
        this.setState({
          oldPass: '',
          newPass: '',
          newPassConfirm: '',
          err: {
            oldPass: false,
            newPass: false,
            newPassConfirm: false
          },
          openTab: ''
        })
        Swal.fire({
          title: '<span class="swal_title"> Password Updated!',
          text: 'You will be logged out. Please enter your new credentials.',
          icon: 'success',
          background: '#1E1F26',
          customClass: {
            confirmButton: 'swal_confirm_button'
          }
        }).then(() => {
          axios.get('/auth/logout')
          window.location.href = '/'
        })
        // this.setSnackbar("success", "Your password has been changed, please log in.");
      })
      .catch(error => {
        // console.log(error.response.data)
        if (error.response && error.response.data[0]) {
          const errorKey = error.response.data[0]
          const errorMessage = error.response.data[1]
          this.setState({
            oldPass: '',
            newPass: '',
            newPassConfirm: '',
            err: {
              [errorKey]: true
            }
          })
          Swal.fire({
            title: 'ERROR',
            text: errorMessage || 'an error has occurred',
            icon: 'error',
            background: '#1E1F26',
            customClass: {
              confirmButton: 'swal_confirm_button',
              content: 'swal_text',
              title: 'swal_text'
            }
          })
        }
      })
  }

  editAddress = () => {
    // {!} EDIT ADDRESS FUNCTIONALITY
  }

  render () {
    return (
      <div className='settings'>
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
        {/* <div className='page_header'>Settings</div> */}
        <div className='settings_container'>
          <div className='section_container'>
            <div className='page_subheader'>Edit Account</div>
            <div className='edit_account_container'>
              {/* <div
                className='edit_header'
                onClick={() => this.openTab('email')}
              >
                <div className='edit_dropdown'>Email</div>
                {this.state.openTab !== 'email' ? (
                  <ExpandMoreIcon />
                ) : (
                    <ExpandLessIcon className='dropdown_active' />
                  )}
              </div>
              {this.state.openTab === 'email' && (
                <div>
                  <AuthField
                    widthCSS='edit_auth_field'
                    name='newEmail'
                    value={this.state.newEmail}
                    type='text'
                    changeField={this.onChange}
                    icon={<MailOutlineIcon className='auth_icon' />}
                    placeholder={this.state.originalEmail}
                    error={this.state.err.email}
                  />
                  <GreenButton
                    variant='contained'
                    className='full'
                    onClick={this.editEmail}
                  >
                    SAVE
                  </GreenButton>
                </div>
              )} */}
            </div>
            <div className='edit_account_container'>
              <div
                className='edit_header'
                onClick={() => this.openTab('password')}
              >
                <div className='edit_dropdown'>Password</div>
                {this.state.openTab !== 'password' ? (
                  <ExpandMoreIcon />
                ) : (
                  <ExpandLessIcon className='dropdown_active' />
                )}
              </div>
              {this.state.openTab === 'password' && (
                <div>
                  <InputField
                    widthCSS='edit_auth_field'
                    name='oldPass'
                    title='Current Password'
                    value={this.state.oldPass}
                    type='password'
                    changeField={this.onChange}
                    placeholder='********'
                    error={this.state.err.oldPass}
                  />
                  <InputField
                    widthCSS='edit_auth_field'
                    name='newPass'
                    value={this.state.newPass}
                    title='New Password'
                    type='password'
                    changeField={this.onChange}
                    placeholder='********'
                    error={this.state.err.newPass}
                  />
                  <InputField
                    widthCSS='edit_auth_field'
                    name='newPassConfirm'
                    value={this.state.newPassConfirm}
                    type='password'
                    title='Confirm New Password'
                    changeField={this.onChange}
                    placeholder='********'
                    error={this.state.err.newPass}
                  />
                  <GreenButton
                    variant='contained'
                    className='full settings_button'
                    onClick={this.editPass}
                  >
                    SAVE
                  </GreenButton>
                </div>
              )}
            </div>
            <div className='edit_account_container'>
              <div
                className='edit_header'
                onClick={() => this.openTab('payment')}
              >
                <div className='edit_dropdown'>Payment</div>
                {this.state.openTab !== 'payment' ? (
                  <ExpandMoreIcon />
                ) : (
                  <ExpandLessIcon className='dropdown_active' />
                )}
              </div>
              {this.state.openTab === 'payment' && <ChangePayment />}
            </div>
            {/* <div className='edit_account_container'>
              <div
                className='edit_header'
                onClick={() => this.openTab('address')}
              >
                <div className='edit_dropdown'>Address</div>
                {this.state.openTab !== 'address' ? (
                  <ExpandMoreIcon />
                ) : (
                  <ExpandLessIcon className='dropdown_active' />
                )}
              </div>
             {this.state.openTab === 'address' && (
                <div className="edit_address_fields">
                  <InputField
                    widthCSS='edit_address_input'
                    title='Address Line 1'
                    name='ClientAddr1'
                    value={this.state.addressClientAddr1}
                    type='text'
                    changeField={this.onChange}
                    placeholder=''
                  />
                  <InputField
                    widthCSS='edit_address_input'
                    title='Address Line 2'
                    name='ClientAddr2'
                    value={this.state.ClientAddr2}
                    type='text'
                    changeField={this.onChange}
                    placeholder=''
                  />
                  <InputField
                    widthCSS='edit_address_input'
                    title='City'
                    name='ClientCity'
                    value={this.state.ClientCity}
                    type='text'
                    changeField={this.onChange}
                    placeholder=''
                  />
                  <InputField
                    widthCSS='edit_address_input'
                    title='State'
                    name='ClientState'
                    value={this.state.ClientState}
                    type='text'
                    changeField={this.onChange}
                    placeholder=''
                  />
                  <InputField
                    widthCSS='edit_address_input'
                    title='Postal Code'
                    name='ClientPostalCode'
                    value={this.state.ClientPostalCode}
                    type='number'
                    changeField={this.onChange}
                    placeholder=''
                  />
                  <GreenButton
                    variant='contained'
                    className='full'
                    onClick={this.editAddress}
                  >
                    SAVE
                  </GreenButton>
                </div>
              )}
            </div>*/}
          </div>
          <div className='section_container'>
            <Link to='/logout'>
              <RedButton
                variant='contained'
                className='half logout_button'
                startIcon={<ExitToAppIcon />}
              >
                Logout
              </RedButton>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}
export default connect(mapStateToProps)(Settings)
