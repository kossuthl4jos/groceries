import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const uuidv4 = require('uuid/v4');


export class ListManager extends Component {
	constructor(props) {
    super(props);
    this.state = {
			addingList: false,
			newListName: ''
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
		}
		this.props.addList(newList)
		this.stopAddingList();
	}

	stopAddingList = () => {
		this.setState({ addingList: false })
	}

	handleNewListName = (e) => {
		this.setState({ newListName: e.target.value })
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

				<Modal show={this.state.addingList} onHide={this.stopAddingList}>
					<Modal.Header closeButton>
						<Modal.Title>New list</Modal.Title>
					</Modal.Header>

					<Modal.Body>
						<Form.Control
							size="lg"
							type="text"
							placeholder="Enter name"
							onChange={this.handleNewListName}/>
					</Modal.Body>

					<Modal.Footer>
						<Button variant="secondary" onClick={this.stopAddingList}>Close</Button>
						<Button variant="primary" onClick={this.addList}>Save changes</Button>
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
