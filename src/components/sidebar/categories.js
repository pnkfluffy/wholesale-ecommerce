import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { withRouter } from 'react-router-dom'


const mapStateToProps = state => ({
  state: state.reducer
})

class Categories extends React.Component {
  setCategory = category => {
    if (window.location !== '/') {
      this.props.history.push('/')
    }
    this.props.dispatch({ type: 'UPDATE_CATEGORY', payload: category })
  }

  render () {
    let categories
    if (this.props.state.categories) {
      categories = this.props.state.categories.categories.map(category => {
        return (
          <div
            className={`category + ${this.props.state.categories.category ===
              category && 'category_active'}`}
            onClick={() => this.setCategory(category)}
            key={category}
          >
            {this.props.state.categories.category === category && (
              <div className='category_active_dash' />
            )}
            {category}
          </div>
        )
      })
    }

    return (
      <div className='categories_sidebar'>
        <div className='sidebar_section_header'>Categories</div>
        <div
          className={`category + ${this.props.state.categories.category ===
            'All' && 'category_active'}`}
          onClick={e => this.setCategory('All')}
        >
          {this.props.state.categories.category === 'All' && (
            <div className='category_active_dash' />
          )}
          All 
        </div>
        {categories}
      </div>
    )
  }
}

export default withRouter(connect(mapStateToProps)(Categories))
