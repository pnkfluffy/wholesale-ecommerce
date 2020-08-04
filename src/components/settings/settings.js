import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import { RedButton, GreenButton } from '../reuseable/materialButtons'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import MailOutlineIcon from '@material-ui/icons/MailOutline'
import VpnKeyIcon from '@material-ui/icons/VpnKey'
import AuthField from '../auth/AuthField'
import InputField from '../reuseable/InputField'
import Swal from 'sweetalert2'
import store from "../../redux/store";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";

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
      err: {
        email: false,
        oldPass: false,
        newPass: false,
        newPassConfirm: false
      }
    }
  }

  showUser = () => {
    console.log(this.props.state.user)
  }

  clearFields = () => {
    //  {!} IMPORT ADDRESS FROM CLIENT ADDRESS
    this.setState({
      originalEmail: this.props.state.user.email,
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

  editEmail = () => {
    axios.post('/auth/editEmail', {email: this.state.newEmail})
         .then(res => {
           store.dispatch({ type: 'UPDATE_EMAIL', payload: this.state.newEmail })
           this.setState({
             originalEmail: this.state.newEmail,
             newEmail: '',
             emailButtonActive: false,
           })
         })
         .catch(error => {
           console.log(error.response.data)
           if (error.response && error.response.data)
           {
             Swal.fire('ERROR:', error.response.data, 'error')
             this.setState({
               err: {
                 email: true
               }
             })
           }
         })
  }

  editPass = () => {
    axios.post('/auth/editPassword', { oldPass: this.state.oldPass,
                                                newPass: this.state.newPass,
                                                newPassConfirm: this.state.newPassConfirm
                                              })
        .then(res => {
          console.log(res.data);
          this.setState({
            oldPass: '',
            newPass: '',
            newPassConfirm: '',
            err: {
              oldPass: false,
              newPass: false,
              newPassConfirm: false
            },
            pswdButtonActive: false,
          })
        })
        .catch(error => {
          console.log(error.response.data)
          if (error.response && error.response.data[0])
          {
            const errorKey = error.response.data[0];
            const errorMessage = error.response.data[1];
            this.setState({
              oldPass: '',
              newPass: '',
              newPassConfirm: '',
              err: {
                [errorKey]: true,
              }
            })
            Swal.fire('ERROR:',errorMessage, 'error')
          }
        })
  }

  editAddress = () => {
    // {!} EDIT ADDRESS FUNCTIONALITY
  }

  render () {
    return (
      <div className='settings'>
        {/* <div className='page_header'>Settings</div> */}
        <div className='settings_container'>
          <div className='section_container'>
            <div className='page_subheader'>Edit Account</div>
            <div className='edit_account_container'>
              <div
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
                  {this.state.emailButtonActive ? (
                      <GreenButton
                          variant='contained'
                          className='full'
                          onClick={this.editEmail}
                      >
                        SAVE
                      </GreenButton>
                  ) : (
                      <GreenButton
                          variant='contained'
                          className='full'
                          disabled={true}
                          style={{color: 'white'}}
                      >
                        <CheckCircleOutlineIcon />
                        EMAIL CHANGED
                      </GreenButton>
                  )}
                </div>
              )}
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
                      error={this.state.err.newPassConfirm}
                  />
                  {this.state.pswdButtonActive ? (
                      <GreenButton
                          variant='contained'
                          className='full'
                          onClick={this.editPass}
                      >
                        SAVE
                      </GreenButton>
                  ) : (
                      <GreenButton
                          variant='contained'
                          className='full'
                          disabled={true}
                          style={{color: 'white'}}
                      >
                        <CheckCircleOutlineIcon />
                        PASSWORD CHANGED
                      </GreenButton>
                  )}
                </div>
              )}
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
export default connect(mapStateToProps)(Settings);
