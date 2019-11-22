import React, { Component } from 'react'
import { Link } from 'react-router-dom';


export class Navbar extends Component {
	render() {
		return (
			<div className="navigation-bar">
			<Link
				className="nav-button"
				to="/"
				style={{ textDecoration: 'none' }}>
					<i className="fas fa-list" />
					List
			</Link>
			<Link
				className="nav-button"
				to="/stats"
				style={{ textDecoration: 'none' }}>
					<i className="fas fa-chart-pie" />
					Stats
			</Link>

			<Link
				className="nav-button"
				to="/"
				style={{ textDecoration: 'none' }}>
					<i className="fas fa-utensils" />
					Recipes
			</Link>
			</div>
		)
	}
}

export default Navbar
