import React from 'react'

class RedirectHome extends React.Component {
	render(){
		window.location.href = '/'
		return(
			<div></div>
		)
	}
}

export default RedirectHome