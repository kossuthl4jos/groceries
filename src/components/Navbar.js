import React, { Component } from 'react'

export class Navbar extends Component {
	render() {
		return (
			<div className="navigation-bar">
					<div className="nav-button"> List </div>
					<div className="nav-button"> Stats </div>
					<div className="nav-button"> Recipes </div>
			</div>
		)
	}
}

export default Navbar
