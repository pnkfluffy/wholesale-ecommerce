import React from 'react'
import { Link } from "react-router-dom";

class Homepage extends React.Component {
	render() {
		return (
			<div>
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
			</div>
		)
	}
}

export default Homepage