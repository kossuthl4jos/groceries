import React, { Component } from 'react'

export class Navbar extends Component {
	render() {
		return (
			<div style={ navBarStyle } className="has-background-grey-lighter">
					<div style={ navButton }>	List </div>
					<div style={ navButton }> Stats </div>
					<div style={ navButton }> Recipes </div>
			</div>
		)
	}
}

const navBarStyle = {
	display: "flex",
	position: "fixed",
	bottom: "0",
	width: "100%"
}

const navButton = {
	width: "calc(100% / 3)",
	display: "inline-block",
	verticalAlign: "top",   
	textAlign: "center",
	margin:"2%",    
	padding: "20px",
}

export default Navbar
