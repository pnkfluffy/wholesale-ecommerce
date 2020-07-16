import React from 'react'
import { connect } from 'react-redux'
import FilterResults from 'react-filter-search'
import ProductCard from './productCard'
const mapStateToProps = state => ({
  state: state.reducer
})

class Products extends React.Component {
  print_products = () => {
    const category = this.props.state.products.category
    let products = this.props.state.products.products
    let categorizedProducts
    if (!products.length) {
      // {!} STYLE
      return <div>SERVER ERROR: NO PRODUCTS FOUND</div>
    }

    if (category === 'All') {
      categorizedProducts = products
    } else {
      categorizedProducts = products.map(product => {
        if (category === product.category) {
          return product
        }
        return
      })
    }
    return categorizedProducts.map(product => <ProductCard product={product} />)
    // return products.map(product => {
    //   if (this.props.state.products.category === 'All')
    //     return <ProductCard product={product} />
    //   else if (this.props.state.products.category === product.category)
    //     return <ProductCard product={product} />
    // })
  }
  render () {
    return (
      <div className='products'>
        <b>Discover New Products</b>
        <div className='products_area'>{this.print_products()}</div>
      </div>
    )
  }
}
export default connect(mapStateToProps)(Products)
