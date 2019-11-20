import React, { Component } from 'react'

export class ItemsToBuy extends Component {
	hasAnyToBuy() {
		return this.props.items.some(item => !item.completed);
	}

	render() {
		if(this.hasAnyToBuy()) {
			return (
				this.props.items.map((item) => ( !item.completed &&
					<div key={ item.itemId }>
						<div className="item has-text-left">
								{ item.name }
								<input style={{ float:"right" }} type="checkbox" />
						</div>
					</div>
				))
			)
		}
	}
}

export default ItemsToBuy
