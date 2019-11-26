import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Collapse from 'react-bootstrap/Collapse';
import InputGroup from 'react-bootstrap/InputGroup';

const uuidv4 = require('uuid/v4');

export class ListManager extends Component {
	constructor(props) {
    super(props);
    this.state = {
			addingList: false,
			addingItem: false,
			newListName: '',
			newItemName: '',
		};
  }

	addList = () => {
		const newList = {
			id: uuidv4(),
			name: this.state.newListName,
			items: []
		};
		this.props.addList(newList);
		this.stopAddingList();
	}

	addItem = () => {
		const newItem = {
			itemId: uuidv4(),
			name: this.state.newItemName,
			completed: false,
			completedBy: '',
			price: undefined
		};
		this.props.addItem(newItem);
		this.stopAddingItem();
		this.clearStateForItem();
	}
	
	startAddingList = () => {
		this.setState({ addingList: true })
	}

	stopAddingList = () => {
		this.setState({ addingList: false });
	}

	toogleItemForm = () => {
		this.setState({
			addingItem: !this.state.addingItem
		});
	}

	stopAddingItem = () => {
		this.setState({ addingItem: false });
	}

	clearStateForItem = () => {
		this.setState({ newItemName: '' });
	}

	handleNewListName = (e) => {
		this.setState({ newListName: e.target.value });
	}

	handleNewItemName = (e) => {
		this.setState({ newItemName: e.target.value });
	}

	render() {
		return (
			<div className="main-component">
					<Form>
						<Form.Group controlId="selectList">
							<InputGroup>
								<Form.Control
									onChange={ (e) => this.props.updateSelectedList(e.target.value) }
									value= { this.props.selectedListId }
									as="select">
									{
										this.props.lists.map((list) => (
											<option
												value={ list.id }
												key={ list.id }
											>
												{ list.name }
											</option>
										))
									};
								</Form.Control>
								<InputGroup.Append
									onClick={ this.startAddingList }>
									<InputGroup.Text>+</InputGroup.Text>
								</InputGroup.Append>
							</InputGroup>
						</Form.Group>
					</Form>

				<div
					className="new-item-btn"
					onClick={ this.toogleItemForm }>
					Add new item
				</div>
				<Collapse in={this.state.addingItem}>
					<Form>
							<Form.Control
								placeholder="Enter item name"
								value={ this.state.newItemName}
								onChange={ this.handleNewItemName }/>
							<Form.Text className="text-muted">
								This item will be added to the selected shopping list.
							</Form.Text>
						<Button variant="primary" onClick={ this.addItem }>
							Add
						</Button>
					</Form>
				</Collapse>

				<Modal
					show={ this.state.addingList }
					onHide={ this.stopAddingList }
					centered>
					<Modal.Header closeButton>
						<Modal.Title>New list</Modal.Title>
					</Modal.Header>

					<Modal.Body>
						<Form.Control
							size="lg"
							type="text"
							placeholder="Enter name"
							onChange={ this.handleNewListName }/>
					</Modal.Body>

					<Modal.Footer>
						<Button variant="secondary" onClick={ this.stopAddingList }>Close</Button>
						<Button variant="primary" onClick={ this.addList }>Save changes</Button>
					</Modal.Footer>
				</Modal>
			</div>
		)
	}
}

export default ListManager
