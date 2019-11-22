import React, { Component } from 'react'
import PropTypes from 'prop-types';

export class Items extends Component {
	render() {
		return (
			<div>
				{
					this.props.items.map((item) => ( !item.completed &&
						<div key={ item.itemId }>
							<div className="item has-text-left">
									{ item.name }
									<div>
										<i class="far fa-check-square"></i>
									</div>
							</div>
						</div>
					))
				}
				{
					this.props.items.map((item) => ( item.completed &&
						<div key={ item.itemId }>
							<div className="has-text-left"> completed </div>
							<div className="item has-text-left" style={{ textDecoration: "line-through"}}>
									{ item.name }
									<input style={{ float:"right" }} type="checkbox" />
							</div>
						</div>
					))
				}
			</div>
		)
	}
}

Items.prototypes = {
	items: PropTypes.array.isRequired
}

export default Items
