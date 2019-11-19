import React, { Component } from 'react'
import PropTypes from 'prop-types';


export class Items extends Component {
	render() {
		return this.props.items.map((item) => (
			<div className="item has-text-left" key={ item.itemId }>
					{ item.name }
					<input style={{ float:"right" }} type="checkbox" />
			</div>
		));
	}
}

Items.prototypes = {
	items: PropTypes.array.isRequired
}

export default Items
