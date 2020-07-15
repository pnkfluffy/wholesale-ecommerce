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

    setCategory = category => {
        this.props.dispatch({ type: 'UPDATE_CATEGORY', payload: category });
    }

    getAllCategories = () => {
        console.log("getting categories");
        if (!this.state.categories[0])
        {
            axios
                .get("products/categories")
                .then(res => {
                    console.log(res)
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
                         onClick= {e => this.setCategory(category)}>
                        { category }
                    </div>
            )
        })
}

    render() {
        return (
                <div className="categories_sidebar">
                    Categories<br/>
                    <div className="categories_sidebar_link" onClick= {e => this.setCategory("All")}>
                        All
                    </div>
                    { this.getAllCategories() }
                </div>
        );
    }
}

export default connect(mapStateToProps)(Categories);
