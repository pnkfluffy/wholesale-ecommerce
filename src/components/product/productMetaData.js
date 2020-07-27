import React from 'react'

const MetaDataCard = ({ title, variable, unit }) => {
  return (
    <div className='meta_data_card'>
      <div className='meta_title'>{title}</div>
      <div className='meta_contents'>
        <div className='meta_variable'>{variable}</div>
        <div className='meta_unit'>{unit}</div>
      </div>
    </div>
  )
}

class ProductMetaData extends React.Component {
  render () {
    return (
      <div className='product_meta_data'>
        <MetaDataCard
          title='CBD'
          variable={this.props.metaData.cbd.quantity}
          unit={this.props.metaData.cbd.unit}
        />
        <MetaDataCard
          title='THC'
          variable={this.props.metaData.thc.quantity}
          unit={this.props.metaData.thc.unit}
        />
        <MetaDataCard
          title='CT'
          variable={this.props.metaData.units.quantity}
          unit={this.props.metaData.units.unit}
        />
        <MetaDataCard
          title='Weight'
          variable={this.props.metaData.weight.quantity}
          unit={this.props.metaData.weight.unit}
        />
      </div>
    )
  }
}
export default ProductMetaData
