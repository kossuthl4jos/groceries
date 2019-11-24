import React, { Component } from 'react'

export class Statistics extends Component {

	getTotalAmountSpent = () => {
		let totalAmountSpent = 0;
		const items = this.getItems();

		for (let i = 0; i < items.length; i++) {
			const completedItems = items[i].filter(item => item.completed);

			if(completedItems.length > 0) {
				for (let i = 0; i < completedItems.length; i++) {
					if(!isNaN(completedItems[i].price)) {
						totalAmountSpent += parseInt(completedItems[i].price);
					}
				}
			}
		}

		return totalAmountSpent;
	}

	getItems = () => {
		return this.props.lists.map(list => list.items);
	}

	render() {
		return (
			<div>
				Total money spent on Groceries: { this.getTotalAmountSpent() }
			</div>
		)
	}
}

export default Statistics;
