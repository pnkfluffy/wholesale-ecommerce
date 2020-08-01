import React from 'react'
import { connect } from 'react-redux'
import FilterResults from 'react-filter-search'
import ProductCard from './productCard'

const mapStateToProps = state => ({
  state: state.reducer
})

class Products extends React.Component {
  print_products = () => {
    //  made lowercase and replaces space with underscore
    const category = this.props.state.categories.category
      .toLowerCase()
      .replace(/ /g, '_')
    const searchTerm = this.props.state.products.searchTerm
    let products = this.props.state.products.products
    let categorizedProducts = []
    if (!products.length) {
      // {!} STYLE
      return <div>SERVER ERROR: NO PRODUCTS FOUND</div>
    }

    //  filters by category
    if (category === 'all') {
      categorizedProducts = products
    } else {
      products.forEach(product => {
        if (product.category && category === product.category.toLowerCase())
          categorizedProducts.push(product)
      })
    }

    //  filters by searchterm if searchterm exists
    if (searchTerm !== '') {
      return (
        <FilterResults
          value={searchTerm}
          data={categorizedProducts}
          renderResults={results =>
            results.map(product => <ProductCard product={product} key={product._id}/>)
          }
        />
      )
    } else {
      return categorizedProducts.map(product => (
        <ProductCard product={product} key={product._id}/>
      ))
    }
  }

  render () {
    const category =
      this.props.state.categories.category === 'All'
        ? 'Products'
        : this.props.state.categories.category
    return (
      <div className='products'>
        <div className='home_header_text page_header'>
          Discover New&nbsp;
          <div className='home_header_category'>{category}</div>
        </div>
        <div className='products_area'>{this.print_products()}</div>
      </div>
    )
  }
}
export default connect(mapStateToProps)(Products)
