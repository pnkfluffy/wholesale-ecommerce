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

    //  filters by category
    if (category === 'All') {
      categorizedProducts = products
    } else {
      products.forEach(product => {
        if (category === product.category) categorizedProducts.push(product)
      })
    }

    //  filters by searchterm if searchterm exists
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
    const category =
      this.props.state.products.category === 'All'
        ? 'Products'
        : this.props.state.products.category
    return (
      <div className='products'>
        <div className='home_header_text'>
          Discover New&nbsp;
          <div className='home_header_category'>{category}</div>
        </div>
        <div className='products_area'>{this.print_products()}</div>
      </div>
    )
  }
}
export default connect(mapStateToProps)(Products)
