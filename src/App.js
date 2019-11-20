import React, { Component } from 'react';
import './App.css';

import { sandwich, bolognese } from './gateway/fake-gateway'

import List from './components/List'
import ListManager from './components/ListManager';

class App extends Component {

	state = {
		lists: [...sandwich, ...bolognese],
		selectedListId: '1'
	}

	updateSelectedList = (selectedListId) => {
		this.setState({
			selectedListId 
		})
	}
	
	getSelectedList() {
		return this.state.lists.find(item => item.id === this.state.selectedListId);
	}

	render() {
		return (
			<div className="App">
				<section className="hero is-primary is-small">
					<div className="hero-body">
						<div className="container">
							<h1 className="title has-text-left">
								Groceries
							</h1>
						</div>
					</div>
				</section>
				<ListManager
					updateSelectedList={ this.updateSelectedList }
					lists={ this.state.lists }
				/>
				<div className="container">
					<List
						list={ this.getSelectedList() }
					/>
				</div>
			</div>
		);
	}
}

export default App;
