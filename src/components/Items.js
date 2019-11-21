import React, { Component } from 'react'
import PropTypes from 'prop-types';
import ItemsToBuy from './ItemsToBuy';
import CompletedItems from './CompletedItems';


export class Items extends Component {
	render() {
		return (
			<section className="section">
				<ItemsToBuy items={ this.props.items } />
				<CompletedItems items={ this.props.items } />
			</section>
		)
	}
}

Items.prototypes = {
	items: PropTypes.array.isRequired
}

export default Items
