import React from 'react'
import { Link } from "react-router-dom";
import { connect } from "react-redux";


const mapStateToProps = (state) => ({
	state: state.reducer,
  });

class Homepage extends React.Component {
	constructor(props){
		super(props)
	}

	render() {
		return (
			<div>
				{this.props.state.user.googleID ? 'LOGGED IN' : 'NOT LOGGED IN'}
				<div>
					<Link to="/login" >
						Login
					</Link>
				</div>
				<div>
					<Link to="/logout">
						Logout
					</Link>
				</div>
				<div>
					<Link to="/admin">
						Admin
					</Link>
				</div>
			</div>
		)
	}
}

export default connect(mapStateToProps)(Homepage)