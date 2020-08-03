import React from 'react'
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
      newPass: '',
      ClientAddr1: '',
      ClientAddr2: '',
      ClientCity: '',
      ClientPostalCode: '',
      ClientState: ''
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
    // {!} EDIT EMAIL FUNCTIONALITY
  }

  editPass = () => {
    // {!} EDIT PASSWORD FUNCTIONALITY
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
                  />
                  <GreenButton
                    variant='contained'
                    className='full'
                    onClick={this.editEmail}
                  >
                    SAVE
                  </GreenButton>
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
                  <AuthField
                    widthCSS='edit_auth_field'
                    name='newPass'
                    value={this.state.newPass}
                    type='password'
                    changeField={this.onChange}
                    icon={<VpnKeyIcon className='auth_icon' />}
                    placeholder='********'
                  />
                  <GreenButton
                    variant='contained'
                    className='full'
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
            </div>
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
