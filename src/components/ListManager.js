import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Collapse from 'react-bootstrap/Collapse';

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

	startAddingList = () => {
		this.setState({ addingList: true })
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
	}

	stopAddingList = () => {
		this.setState({ addingList: false });
	}

	stopAddingItem = () => {
		this.setState({ addingItem: false });
	}

	handleNewListName = (e) => {
		this.setState({ newListName: e.target.value });
	}

	handleNewItemName = (e) => {
		this.setState({ newItemName: e.target.value });
	}

	toogleItemForm = () => {
		this.setState({
			addingItem: !this.state.addingItem
		});
	}

	render() {
		return (
			<section className="section">
				<div className="select">
					<select
						onChange={ (e) => this.props.updateSelectedList(e.target.value) }>
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
					</select>
				</div>

				<div
					onClick={ this.startAddingList }
					style={ addButton }>
					<i className="fas fa-plus-circle"></i>
				</div>

				<div
					className="new-item-btn"
					onClick={ this.toogleItemForm }>
					Add new item
				</div>
				<Collapse in={this.state.addingItem}>
				<Form>
						<Form.Control
							placeholder="Enter item name"
							onChange={ this.handleNewItemName }/>
						<Form.Text className="text-muted">
							This item will be added to the selected shopping list.
						</Form.Text>
					<Button variant="primary" onClick={ this.addItem }>
						Add
					</Button>
				</Form>
				</Collapse>

				<Modal show={ this.state.addingList } onHide={ this.stopAddingList }>
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

			</section>
		)
	}
}


const addButton = {
	display: "inline-block"
}

export default ListManager
