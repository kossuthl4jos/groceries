import React, { Component } from 'react'

export class CompletedItems extends Component {
	constructor(props) {
    super(props);
    this.state = {
			showDetails: false
		};
	}
	
	toogleDetails = () => {
		this.setState({
			showDetails: !this.state.showDetails
		});
	}

	render() {
		return (
			<div onClick={ this.toogleDetails }>
				<div className="item has-text-left" style={{ textDecoration: "line-through"}}>
						{ this.props.item.name }
						<div className="completed-check-box">
							<i className="fas fa-check fa-xs"></i>
						</div>							
				</div>

				{ this.state.showDetails &&
					<div>
						<div>
							Purchased by: { this.props.item.completedBy}
						</div>
						<div>
							For { this.props.item.price } €
						</div>
					</div>
				}
			</div>
		)
	}
}

export default CompletedItems
