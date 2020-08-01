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
          <SettingsIcon /> Settings
        </Link>
        <Link className='dropdown_link' to='/logout'>
          <ExitToAppIcon />
          Logout
        </Link>
      </div>
    )
  }
}

export default connect(mapStateToProps)(DropDown)
