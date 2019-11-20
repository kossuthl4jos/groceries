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
			</section>
		)
	}
}

export default ListManager
