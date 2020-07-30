import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'

import loading from '../../resources/images/loadingBig.svg'
import GCFillInfo from './gcFillInfo'
import GCPay from './gcPay'

const mapStateToProps = state => ({
  state: state.reducer
})

class GoCardless extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      hasClientID: false,
      hasMandate: false
    }
  }

  componentDidMount () {
    this.setState({
      loading: true
    })
    this.checkClientCGID()
    this.checkClientMandate()
  }

  checkClientCGID = () => {
    console.log('checking client id')
    axios
      .get('/api/gc/checkClientID')
      .then(res => {
        if (res.data) {
          console.log('got client id')
          this.setState({
            hasClientID: true,
            loading: false
          })
        } else {
          this.setState({
            loading: false
          })
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  checkClientMandate = () => {
    axios
      .get('/api/gc/checkClientMandate')
      .then(res => {
        if (res.data) {
          this.setState({
            hasMandate: true,
            loading: false
          })
        } else {
          this.setState({
            loading: false
          })
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  confirmAccount = () => {
    let params = new URLSearchParams(window.location.href)
    if (params.has('https://wholesale-portal-testing.herokuapp.com/cart?redirect_flow_id')) {
      this.setState({
        loading: true
      })
      const id = localStorage.getItem('gc')
      console.log(id)
      axios
        .post('/api/gc/completeRedirect', { id: id })
        .then(res => {
          this.setState({
            hasMandate: true,
            hasClientID: true,
            loading: false
          })
          this.props.history.push('/cart')
          this.props.history.push('/cart')
          localStorage.removeItem('gc')
        })
        .catch(err => {
          console.log(err)
          this.setState({
            loading: false
          })
          this.props.history.push('/cart')
        })
    } else {
      this.setState({
        hasClientID: false,
        loading: false
      })
    }
  }

  render () {
    return (
      <div className='buy'>
        {(() => {
          // if (this.state.loading) {
          //   return <img src={loading} />
          // } else if (!this.state.hasClientID) {
          //   return <GCFillInfo total={this.props.total} />
          // } else if (!this.state.hasMandate) {
          //   {
          //     this.confirmAccount()
          //   }
          // } else {
            return <GCPay total={this.props.total} />
          // }
        })()}
      </div>
    )
  }
}

export default connect(mapStateToProps)(GoCardless)
