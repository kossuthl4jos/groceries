import React, { Component } from 'react';
import Items from './Items';
import PropTypes from 'prop-types';

class Lists extends Component {
	render() {
		return this.props.lists.map((list) => (
			<div key={ list.id }>
				<h3>{ list.name }</h3>
				<Items
					items={ list.items }
				/>
			</div>
		));
	}
}

Lists.prototypes = {
	lists: PropTypes.array.isRequired
}

export default Lists;
