import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

/*icons*/
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined'
import Badge from '@material-ui/core/Badge';
import SettingsIcon from '@material-ui/icons/Settings'

/*images*/
import logo from '../../resources/images/cbddy_logo_small.png'
import blank_image from '../../resources/images/blank_image.jpg'
import Categories from './categories'

const mapStateToProps = state => ({
  state: state.reducer
})

class Sidebar extends React.Component {
  render () {
    const location = window.location.pathname
    // console.log('location', location)
    const image = logo ? logo : blank_image
    return (
      <div className='sidebar'>
        <Link to='/'>
          <img src={image} alt='cbddy_logo' className='logo_sidebar' />
        </Link>
        <div className='menu_sidebar'>
          <div className='sidebar_section_header'>Menu</div>
          <Link
            className={`menu_link + ${location === '/' && 'menu_active'}`}
            to='/'
          >
            <HomeOutlinedIcon /> Home
          </Link>
          <Link
            className={`menu_link + ${location === '/account' &&
              'menu_active'}`}
            to='/account'
          >
            <AccountCircleOutlinedIcon /> Account
          </Link>
          <Link
            className={`menu_link + ${location === '/cart' && 'menu_active'}`}
            to='/cart'
          >
            {this.props.state.cart.length > 0 ? (
              <Badge badgeContent={this.props.state.cart.length} color="primary" style={{ transform: 'scale(0.7)', marginRight: "10%", marginLeft: 0 }}>
                <ShoppingCartIcon />
              </Badge>
            ) : (
              <ShoppingCartIcon />
            )}
            Cart
          </Link>
        </div>
        <Categories />
        <div className='sidebar_footer'>
          {/* <p className='sidebar_footer_text'>
            all products contain <a className='dark_green'>&#60;0.3%</a> thc in
            accordance with the farm bill
          </p> */}
          <a className='light_green' href='tel:7205916284'>
            customer support
          </a>
          <a className='light_green' href='https://cbddy.com/privacy-policy/'>
            privacy policy
          </a>
          <a
            className='light_green'
            href='https://cbddy.com/terms-and-conditions/'
          >
            terms and conditions
          </a>
          <p className='sidebar_subfooter_text'>
            &copy; 2020 <a className='dark_green'>CBDDY</a>, all rights reserved
          </p>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(withRouter(Sidebar))
