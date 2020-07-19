import React from 'react'
import { connect } from 'react-redux'
import { GreenButton } from './materialButtons'
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'

const mapStateToProps = state => ({
    state: state.reducer
})

class ReviewsCard extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            productName: "",
        }
    }

    getProductName = () => {
        /* get product name related to this review */
        if (this.props.state.products.products)
        {
            const products = this.props.state.products.products
            const product = products.find(product => product._id === this.props.review.product);
            if (product) {
               return <p>{product.name}</p>
            } else {
                return <p>"product unavailable"</p>
            }
        }
    }

    printStars = () => {
        let i = 0;
        let stars = [];
        while(i < this.props.review.stars)
        {
            const index = i + 1;
            stars.push(<StarIcon onClick={e => this.editStars(index)}></StarIcon>)
            i++
        }
        while(i < 5)
        {
            const index = i + 1;
            stars.push(<StarBorderIcon onClick={e => this.editStars(index)}></StarBorderIcon>)
            i++
        }
        return(stars);
    }

    goToProduct = () => {
        const url = "/product/" + this.props.review.product.toString();
        this.props.history.push(url);
    }

    render () {
        return (
                <div className="reviews_card" onClick={this.goToProduct}>
                    {this.getProductName()}
                    {this.props.review.userName}
                    <div className="stars">
                        {this.printStars()}
                    </div>
                    {this.props.review.review}
                </div>
        )
    }
}
export default compose(
    withRouter,
    connect(mapStateToProps)
)(ReviewsCard);