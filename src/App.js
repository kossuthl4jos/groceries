import React, { Component } from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { sandwich, bolognese } from './gateway/fake-gateway'

import List from './components/List'
import ListManager from './components/ListManager';
import Navbar from './components/Navbar';
import Statistics from './components/Statistics';

class App extends Component {

	state = {
		lists: [...sandwich, ...bolognese],
		selectedListId: '1'
	}

	updateSelectedList = (selectedListId) => {
		this.setState({ selectedListId })
	}

	addList = (list) => {
		const lists = this.state.lists.slice();
		lists.push(list);
		this.setState({ lists });
	}

	addItem = (item) => {
		const lists = this.state.lists.slice();
		lists.find(list => list.id === this.state.selectedListId).items.push(item);
		this.setState({ lists });
	}

	completeItem = (completedItem) => {
		const lists = this.state.lists.slice();
		Object.assign(
			lists
			.find(list => list.id === this.state.selectedListId)
			.items
			.find(item => item.itemId === completedItem.itemId)
			, completedItem
		);

		this.setState({ lists });
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
								Groceries App
							</h1>
						</div>
					</div>
				</section>

				<Router>
					<Switch>
						<Route exact path="/">
							<ListManager
								addList={ this.addList }
								addItem= { this.addItem }
								updateSelectedList={ this.updateSelectedList }
								lists={ this.state.lists } />
	
							<List
								completeItem = { this.completeItem }
								list={ this.getSelectedList() }/>
						</Route>

						<Route exact path="/stats">
							<Statistics lists={ this.state.lists }/>
						</Route>
					</Switch>
					
					<Navbar />
				</Router>
			</div>
		);
	}
}

export default App;
