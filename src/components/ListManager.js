import React, { Component } from 'react'

export class ListManager extends Component {
	render() {
		return (
			<section className="section">
				<div className="select">
					<select onChange={ (e) => this.props.updateSelectedList(e.target.value) }>
						{
							this.props.lists.map((list) => (
								<option
									value={ list.id }
									key={ list.id }
								>
									{ list.name }
								</option>
							))
						};
					</select>
				</div>

				<span
					onClick={() => window.alert('adding new..')}
					style={ addButton }>
					<i className="fas fa-plus-circle"></i>
				</span>
			</section>
		)
	}
}

const addButton = {
	display: "inline",
	float: "right",
}

export default ListManager
