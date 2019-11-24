import React, { Component } from 'react'

import ListGroup from 'react-bootstrap/ListGroup';

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

					<ListGroup variant="flush">
						<ListGroup.Item
							style={{ padding: "0.25rem 1.5rem", fontStyle: "italic" }}>
							by { this.props.item.completedBy}
						</ListGroup.Item>
						<ListGroup.Item
							style={{ padding: "0.25rem 1.5rem", fontWeight: "bold" }}>
							{ this.props.item.price } €
						</ListGroup.Item>
					</ListGroup>
				}
			</div>
		)
	}
}

export default CompletedItems
