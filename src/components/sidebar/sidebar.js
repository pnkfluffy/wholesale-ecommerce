import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

/*icons*/
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined'
import Badge from '@material-ui/core/Badge';

/*images*/
import logo from '../../resources/images/cbddy_logo_small.png'
import Categories from './categories'

const mapStateToProps = state => ({
  state: state.reducer
})

class Sidebar extends React.Component {
  render() {
    const location = window.location.pathname
    console.log('location', location)

    return (
      <div className='sidebar'>
        <Link to='/'>
          <img src={logo} alt='cbddy_logo' className='logo_sidebar' />
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
              <Badge badgeContent={this.props.state.cart.length} color="primary" style={{ transform: 'scale(0.8)', marginRight: "20%" }}>
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
          <p className='sidebar_footer_text'>
            all products contain <a className='dark_green'>&#60;0.3%</a> thc in
            accordance with the farm bill
          </p>
          <p className='sidebar_subfooter_text'>
            <a className='light_green' href='tel:5551234567'>
              customer support
            </a>
          </p>
          <p className='sidebar_subfooter_text'>
            <a className='light_green' href='https://cbddy.com/privacy-policy/'>
              privacy policy
            </a>
          </p>
          <p className='sidebar_subfooter_text'>
            <a
              className='light_green'
              href='https://cbddy.com/terms-and-conditions/'
            >
              terms and conditions
            </a>
          </p>
          <p className='sidebar_subfooter_text'>
            2020 <a className='dark_green'>Cbddy</a>, All rights reserved
          </p>
        </div>
      </div >
    )
  }
}

export default connect(mapStateToProps)(withRouter(Sidebar))
