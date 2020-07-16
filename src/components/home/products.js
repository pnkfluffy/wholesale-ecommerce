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
    const searchTerm = this.props.state.products.searchTerm
    let products = this.props.state.products.products
    let categorizedProducts = []
    if (!products.length) {
      // {!} STYLE
      return <div>SERVER ERROR: NO PRODUCTS FOUND</div>
    }

    if (category === 'All') {
      categorizedProducts = products
    } else {
      products.forEach(product => {
        if (category === product.category) categorizedProducts.push(product)
      })
    }
    console.log('categorized', categorizedProducts)
    if (searchTerm !== '') {
      return (
        <FilterResults
          value={searchTerm}
          data={categorizedProducts}
          renderResults={results =>
            results.map(product => <ProductCard product={product} />)
          }
        />
      )
    } else {
      return categorizedProducts.map(product => (
        <ProductCard product={product} />
      ))
    }
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
