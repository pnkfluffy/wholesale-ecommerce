import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import SettingsIcon from '@material-ui/icons/Settings'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'

const mapStateToProps = state => ({
  state: state.reducer
})

class DropDown extends React.Component {
  constructor (props) {
    super(props)
    this.dropdownRef = React.createRef()
  }
  componentDidMount = () => {
    document.addEventListener('click', this.handleClick, false)
  }
  componentWillUnmount = () => {
    document.removeEventListener('click', this.handleClick, false)
  }
  handleClick = e => {
    // if (!this.dropdownRef.current.contains(e.target)) {
      this.props.closeDropdown()
    // }
  }

  render () {
    return (
      <div ref={this.dropdownRef} className='dropdown'>
        <Link className='dropdown_link' to='/settings'>
          <div className='dropdown_option dropdown_first' onClick={this.cloneRaffle}>
            <SettingsIcon /> Settings
          </div>
        </Link>
        <Link className='dropdown_link' to='/logout'>
          <div className='dropdown_option dropdown_last' onClick={this.deleteRaffle}>
            <ExitToAppIcon />
            Logout
          </div>
        </Link>
      </div>
    )
  }
}

export default connect(mapStateToProps)(DropDown)
