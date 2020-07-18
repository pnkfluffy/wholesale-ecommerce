import React from 'react'
import SearchIcon from '@material-ui/icons/Search'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import DropDown from './dropdown'

const mapStateToProps = state => ({
  state: state.reducer
})

const mapDispatchToProps = dispatch => {
  return {
    updateSearch: e => {
      dispatch({ type: 'UPDATE_SEARCH', payload: e.target.value })
    }
  }
}

class Header extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      dropdown: false
    }
  }
  // {!} IMPLIMENT SEARCH USING THIS LIBRARY:
  //  https://github.com/joehdodd/react-filter-search

  openDropdown = () => {
    this.setState({ dropdown: true })
  }

  closeDropdown = () => {
    console.log('closing!!!')
    this.setState({ dropdown: false })
  }

  render () {
    return (
      <div className='header'>
        <div className='search'>
          <div className='search_input_container'>
            <SearchIcon />
            <input
              className='search_input'
              onChange={this.props.updateSearch}
              placeholder='Search...'
            />
          </div>
          <div className='search_category_container'>
            <div className='search_seperator' />
            <div className='search_category'>
              {this.props.state.categories.category}
            </div>
          </div>
        </div>
        <div className='header_navcard'>
          <div className='header_username'>{this.props.state.user.name}</div>
          <MoreHorizIcon onClick={this.openDropdown} />
          {this.state.dropdown && (
            <DropDown closeDropdown={this.closeDropdown} />
          )}
        </div>
      </div>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header))
