import React from 'react'
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class sidebar extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        return(
            <menu className="sidebar">
                <h1>sidebar</h1>
            </menu>
        )
    }
}
export default sidebar;