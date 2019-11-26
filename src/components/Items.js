import React, { Component } from 'react'
import PropTypes from 'prop-types';

import CompletedItems from './CompletedItems'

import Collapse from 'react-bootstrap/Collapse';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

export class Items extends Component {
	state = {
		showCompletedItems: true,
		completingItem: false,
		deletingItem: false,
		selectedItemId: '',
		completedBy: '',
		price: '',
	};
	
	completeItem = () => {
		const completedItem = {
			itemId: this.state.selectedItemId,
			completed: true,
			completedBy: this.state.completedBy,
			price: this.state.price
		};
		this.props.completeItem(completedItem);
		this.stopCompletingItem();
	}

	deleteItem = () => {
		this.props.deleteItem(this.state.selectedItemId);
	}

	startCompletingItem = (itemId) => {
		this.setState({
			completingItem: true,
			selectedItemId: itemId
		});
	}

	stopCompletingItem = () => {
		this.setState({
			completingItem: false,
			selectedItemId: ''
		});
	}

	handleItemPrice = (e) => {
		this.setState({ price: e.target.value });
	}

	handleItemCompletedBy = (e) => {
		this.setState({ completedBy: e.target.value });
	}

	hasSomeCompleted = () => {
		return this.props.items.some(item => item.completed);
	}

	toogleCompletedItems = () => {
		this.setState({
			showCompletedItems: !this.state.showCompletedItems
		});
	}

	getItemName = () => {
		return this.getSelectedItem() && this.getSelectedItem().name;
	}

	getSelectedItem = () => {
		return this.props.items.find(item => item.itemId === this.state.selectedItemId)
	}

	render() {
		return (
			<div className="main-component">
				{
					this.props.items.map((item) => ( !item.completed &&
						<div key={ item.itemId }>
							<div className="item">
									{ item.name }
									<div
										onClick={ () => this.startCompletingItem(item.itemId) }
										className="to-complete-check-box">
										<i className="fas fa-check fa-xs"></i>
									</div>
							</div>
						</div>
					))
				}
				{
					this.hasSomeCompleted() &&
					<div className="formGroup">
						<div
							className="completed-header input-group"
							onClick={ this.toogleCompletedItems }>
							completed
						<span
							className={ this.state.showCompletedItems ? "active arrow" : "arrow" }>
							<span />
							<span />
						</span>
						</div>
					</div>
				}
			
				<Collapse in={ this.state.showCompletedItems }>
					<div>
						{
							this.props.items.map((item) => (item.completed &&
								<CompletedItems
									key={ item.itemId }
									item={ item }/>
							))
						} 
					</div>
				</Collapse>

				<Modal
					show={ this.state.completingItem }
					onHide={ this.stopCompletingItem }
					centered>
					<Modal.Header>
						<Modal.Title>
							{ this.getItemName() }
						</Modal.Title>
							<Button variant="danger" onClick={ this.deleteItem }>DELETE</Button>
					</Modal.Header>

					<Modal.Body>
						<Form.Group md="4" controlId="itemPrice">
							<InputGroup>
								<InputGroup.Prepend>
									<InputGroup.Text id="inputGroupPrepend">€</InputGroup.Text>
								</InputGroup.Prepend>
								<Form.Control
									type="text"
									placeholder="Price"
									aria-describedby="inputGroupPrepend"
									onChange={ this.handleItemPrice }
									required/>
							</InputGroup>
						</Form.Group>
						<Form.Control
							type="text"
							placeholder="Purchased by"
							onChange={ this.handleItemCompletedBy }/>
					</Modal.Body>

					<Modal.Footer>
						<ButtonToolbar className="justify-content-between">								
							<ButtonGroup className="pull-left" aria-label="First group">
							</ButtonGroup>

							<ButtonGroup aria-label="Second group">
								<Button variant="secondary" onClick={ this.stopCompletingItem }>Close</Button>
								<Button variant="primary" onClick={ this.completeItem }>Save </Button>
							</ButtonGroup>
						</ButtonToolbar>
					</Modal.Footer>
				</Modal>
			</div>
		)
	}
}

Items.prototypes = {
	items: PropTypes.array.isRequired
}

export default Items
