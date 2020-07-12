import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";

const mapStateToProps = (state) => ({
    state: state.reducer,
});

class Categories extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
        }
    }

    getAllProducts = () => {
        axios
            .get("products/all")
            .then(res => {
                this.props.dispatch({ type: 'UPDATE_PRODUCTS', payload: res.data })
            })
            .catch((err) => {
                console.log(err);
            })
    }

    getProductsFromCategory = category => {
        axios
            .get("products/from/" + category)
            .then(res => {
                this.props.dispatch({ type: 'UPDATE_PRODUCTS', payload: res.data })
            })
            .catch((err) => {
                console.log(err);
            })
    }

    getAllCategories = () => {
        console.log("getting categories");
        if (!this.state.categories[0])
        {
            axios
                .get("products/categories")
                .then(res => {
                    this.setState({
                        categories: res.data,
                    })
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        return this.state.categories.map(category => {
            return (
                    <div className="categories_sidebar_link"
                         onClick= {e => this.getProductsFromCategory(category)}>
                        { category }
                    </div>
            )
        })
}

    render() {
        return (
                <div className="categories_sidebar">
                    Categories<br/>
                    <div className="categories_sidebar_link">
                        All
                    </div>
                    { this.getAllCategories() }
                </div>
        );
    }
}

export default connect(mapStateToProps)(Categories);
