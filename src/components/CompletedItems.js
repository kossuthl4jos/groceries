import React, { Component } from 'react'

export class CompletedItems extends Component {
	hasAnyCompleted() {
		return this.props.items.some(item => item.completed);
	}

	render() {
		if(this.hasAnyCompleted()) {
			return (
				this.props.items.map((item) => ( item.completed &&
					<div key={ item.itemId }>
						<div className="has-text-left"> completed </div>
						<div className="item has-text-left" style={{ textDecoration: "line-through"}}>
								{ item.name }
								<input style={{ float:"right" }} type="checkbox" />
						</div>
					</div>
				))
			)
		}
	}
}

export default CompletedItems

