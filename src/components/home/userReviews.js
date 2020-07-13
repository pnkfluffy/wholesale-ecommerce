import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class UserReviews extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="userReviews">
                <h1>User Reviews</h1>
            </div>
        );
    }
}
export default UserReviews;
