import React from 'react'
import { connect } from 'react-redux'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'

const mapStateToProps = state => ({
  state: state.reducer
})

class FavoritesHeart extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isFavorite: false
    }
  }

  toggleFavorites = () => {
    const newFavorite = !this.state.isFavorite
    this.setState({ isFavorite: newFavorite })
    if (newFavorite) {
      this.props.dispatch({
        type: 'ADD_FAVORITE',
        payload: this.props.productID
      })
    } else {
      this.props.dispatch({
        type: 'DELETE_FAVORITE',
        payload: this.props.productID
      })
    }
  }

  isFavorite = () => {
    const favoriteProducts = this.props.state.favorites
    const productID = this.props.productID
    function checkIfIsFavorite (result) {
      return result === productID
    }
    if (favoriteProducts.find(checkIfIsFavorite)) {
      return true
    } else {
      return false
    }
  }

  componentDidMount = () => {
    this.setState({ isFavorite: this.isFavorite() })
  }

  render () {
    const variableCSS = this.props.chooseStyle
      ? 'favorite_product_heart'
      : 'product_card_heart'
    return (
      <div className='clean_css'>
        {this.state.isFavorite ? (
          <FavoriteIcon
            onClick={this.toggleFavorites}
            className={variableCSS}
          />
        ) : (
          <FavoriteBorderIcon
            onClick={this.toggleFavorites}
            className={variableCSS}
          />
        )}
      </div>
    )
  }
}
export default connect(mapStateToProps)(FavoritesHeart)
