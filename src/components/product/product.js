import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import ProductQuantity from './productQuantity'
import UserReviews from './productUserReviews'
import ProductImages from './productImages'
import ProductMetaData from './productMetaData'
import PriceTiers from './priceTiers'
import { addQuantityToCart } from '../reuseable/addQuantityToCart'
import { getPriceByQuantity } from '../reuseable/getPriceByQuantity'
import { GreenButton } from '../reuseable/materialButtons'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import Wishlist from '../reuseable/wishlist';

import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import {classes} from "../reuseable/materialButtons"

const mapStateToProps = state => ({
  state: state.reducer
})

class Product extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      product: {
        category: '',
        description: '',
        name: '',
        price: '',
        //  needs to be moved back up into product
        imageData: [],
        metaData: {
          cbd: {
            unit: '',
            quantity: ''
          },
          thc: {
            unit: '',
            quantity: ''
          },
          units: {
            unit: '',
            quantity: ''
          },
          weight: {
            unit: '',
            quantity: ''
          }
        },
        priceTiers: [],
        _id: ''
      },
      quantity: 1,
      buttonActive: true,
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

  componentDidMount() {
    axios
      .get('/api/products/' + this.props.match.params.productID)
      .then(res => {
        console.log('res', res.data)
        this.setState({
          product: res.data
        })
      })
      .catch(err => {
        console.log('error' + err)
      })
  }

  changeQuantity = quantity => {
    quantity = parseInt(quantity, 10)
    if (quantity > 1000) {
      return
    }
    if (quantity <= 0) this.setState({ quantity: 1 })
    else this.setState({ quantity })
  }

  addToCart = quantity => {
    this.setState({
      buttonActive: false
    }, () => {
      let product = this.state.product
      console.log('PRODUCT', product)
      product.quantity = quantity
      product.product = this.state.product._id
      addQuantityToCart(product)
      this.setSnackbar(
        'success',
        product.quantity +
        product.metaData.units.unit +
        ' ' +
        product.name +
        ' added to your cart'
      )
    }
    )
  }

  setSnackbar = (severity, message) => {
    this.setState({
      snackbarOpen: true,
      snackbarSeverity: severity,
      snackbarMessage: message
    })
  }

  render() {
    const product = this.state.product
    const totalPrice = getPriceByQuantity(
      product.priceTiers,
      this.state.quantity,
      product.price
    )
    if (totalPrice > 10000000) {
      totalPrice = "limit reached"
    }
    return (
      <div className='product_page'>
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
        <div className='product_page_main'>
          <div className='product_page_top'>
            <ProductImages
              images={product.imageData}
              productID={product._id}
              setSnackbar={(severity, message) =>
                this.setSnackbar(severity, message)
              }
            />
            <div className='product_page_info'>
              <div className='product_info'>
                <div className='product_page_info_top'>
                  <div className='product_title'>{product.name}</div>
                </div>
                <ProductMetaData metaData={product.metaData} />
                <div className='price_table_container'>
                  {product.priceTiers.length ? (
                    <PriceTiers
                      tiers={product.priceTiers}
                      product={this.state}
                      addToCart={this.addToCart}
                    />
                  ) : (
                      <div className='no_priceTiers_message'>
                        No bulk discounts have been listed for this product. Want
                      to negotiate something?{' '}
                        <a className='light_green' href='tel:7205916284'>
                          Reach out!
                      </a>
                      </div>
                    )}
                </div>
                <div className='product_quantity_container'>
                  <div className='product_price'>
                    $<div className='price_price'>{totalPrice || ""}</div>
                  </div>
                  <ProductQuantity
                    productID={this.props.match.params.productID}
                    quantity={this.state.quantity}
                    changeQuantity={this.changeQuantity}
                  />
                </div>
              </div>
              <div className='product_purchase'>
              <Wishlist productID={this.props.match.params.productID}/>
                {this.state.buttonActive ? (
                  <GreenButton
                    variant='contained'
                    className='product_button'
                    onClick={() => this.addToCart(this.state.quantity)}
                  >
                    Add To Cart
                  </GreenButton>
                ) : (
                    <GreenButton
                      variant='contained'
                      className='product_button'
                      disabled={true}
                      style={{ color: 'white' }}
                    >
                      <CheckCircleOutlineIcon />
                    Added!
                    </GreenButton>
                  )}
              </div>
            </div>
          </div>
          <p>{product.description}</p>
        </div>
        <UserReviews productID={this.props.match.params.productID} />
      </div>
    )
  }
}
 
export default connect(mapStateToProps)(Product)
