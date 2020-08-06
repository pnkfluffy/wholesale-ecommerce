import React from 'react'

class TrackingLink extends React.Component {
  goToOrder = () => {
    const url = '/order/' + this.props.order._id
    this.props.history.push({
      pathname: url,
      state: {
        payment: this.props.payment,
        order: this.props.order
      }
    })
  }

  render () {
    let carrierURL = ''

    switch (this.props.tracking.company) {
      case 'USPS':
        carrierURL =
          'https://tools.usps.com/go/TrackConfirmAction?tRef=fullpage&tLc=3&text28777=&tLabels='
        break
      case 'UPS':
        carrierURL =
          'https://wwwapps.ups.com/WebTracking/track?track=yes&trackNums='
        break
      case 'Fedex':
        carrierURL =
          'https://www.fedex.com/apps/fedextrack/?action=track&trackingnumber='
        break
      default:
        carrierURL =
          'https://tools.usps.com/go/TrackConfirmAction?tRef=fullpage&tLc=3&text28777=&tLabels='
    }

    const trackingLink = carrierURL + this.props.tracking.number

    return (
      <a
        className='tracking_link'
        href={trackingLink}
        target='_blank'
        rel='noopener noreferrer'
      >
        {this.props.tracking.number}
      </a>
    )
  }
}

export default TrackingLink
