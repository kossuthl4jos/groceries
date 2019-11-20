import React, { Component } from 'react';
import Items from './Items';
import PropTypes from 'prop-types';

class List extends Component {
	render() {
		return (
			<div key={ this.props.list.id }>
				<Items
					items={ this.props.list.items }
				/>
			</div>
		)
	}
}

List.prototypes = {
	lists: PropTypes.array.isRequired
}

export default List;
