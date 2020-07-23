import React from 'react'
import { connect } from 'react-redux'
import productImg from '../../resources/images/product_1.png'
import axios from 'axios'
import loading from "../../resources/images/loading.svg";
import CreateReview from "./createReview";
import ReviewsCard from "../reuseable/reviewsCard";
import UserReviews from "../reuseable/userReviews";

const mapStateToProps = state => ({
    state: state.reducer
})

class ProductUserReviews extends React.Component {
    constructor (props){
        super(props);
        this.state = {
            page: 1
        }
    }

    printReviews = () => {
        const items = this.state.page * 5
        let reviews = [];
        /* get only reviews for this product*/
        const reviewsThisProduct = this.props.state.reviews.filter(review => review.product === this.props.productID)

        /* paginate */
        if (reviewsThisProduct)
        {
            for (let i = items - 5; i < items; i++)
            {
                if (reviewsThisProduct[i])
                    reviews.push(reviewsThisProduct[i])
            }
            if (reviews[0])
            {
                return reviews.map(one => {
                    console.log(one);
                    return <ReviewsCard review = {one}/>
                })
            }
        } else {
            return <p>No reviews for this product yet... Create one for us!</p>
        }
    }

    render () {
        return (
                <div className='user_reviews_area'>
                    <UserReviews reviews ={this.props.state.reviews.filter(review => review.product === this.props.productID)}/>
                    <CreateReview productID = {this.props.productID}/>
                </div>
        )
    }
}
export default connect(mapStateToProps)(ProductUserReviews);
