import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

const mapStateToProps = state => ({
  state: state.reducer
})

class Categories extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      categories: []
    }
  }

  setCategory = category => {
    this.props.dispatch({ type: 'UPDATE_CATEGORY', payload: category })
  }

  //    {!} PUT INTO REDUX STATE INITIALIZATION
  getAllCategories = () => {
    console.log('getting categories')
    if (!this.state.categories.length) {
      axios
        .get('products/categories')
        .then(res => {
          console.log(res)
          this.setState({
            categories: res.data
          })
        })
        .catch(err => {
          console.log(err)
        })
    }
    return this.state.categories.map(category => {
      return (
        <div
          className={`category + ${this.props.state.products.category ===
            category && 'category_active'}`}
          onClick={e => this.setCategory(category)}
        >
          {this.props.state.products.category === category && (
            <div className='category_active_dash' />
          )}
          {category}
        </div>
      )
    })
  }

  render () {
    return (
      <div className='categories_sidebar'>
        <div className='sidebar_section_header'>Categories</div>
        <div
          className={`category + ${this.props.state.products.category ===
            'All' && 'category_active'}`}
          onClick={e => this.setCategory('All')}
        >
          {this.props.state.products.category === 'All' && (
            <div className='category_active_dash' />
          )}
          All
        </div>
        {this.getAllCategories()}
      </div>
    )
  }
}

export default connect(mapStateToProps)(Categories)
