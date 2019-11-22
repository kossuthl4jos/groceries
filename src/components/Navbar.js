import React, { Component } from 'react'

export class Navbar extends Component {
	render() {
		return (
			<div className="navigation-bar">
					<div className="nav-button">
						<i className="fas fa-list" />
						List
					</div>
					<div className="nav-button">
						<i className="fas fa-chart-pie" />
						Stats
					</div>
					<div className="nav-button">
						<i className="fas fa-utensils" />
						Recipes
					</div>
			</div>
		)
	}
}

export default Navbar
