import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { sandwich, bolognese } from './gateway/fake-gateway'
import PrivateRoute from './PrivateRoute'

import {Login} from './components'
import Signup from './components/Signup'

import Header from './components/Header'
import List from './components/List'
import ListManager from './components/ListManager';
import Navbar from './components/Navbar';
import Statistics from './components/Statistics';

class App extends Component {
	state = {
		lists: [...sandwich, ...bolognese],
		selectedListId: '1'
	};

	addList = (list) => {
		const lists = this.state.lists.slice();
		lists.push(list);
		this.setState({ lists });
		this.updateSelectedList(list.id);
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

	deleteItem = (itemId) => {
		const lists = this.state.lists.slice();
		const itemIndexToDelete =
			lists
				.find(list => list.id === this.state.selectedListId).items
				.findIndex(item => item.itemId === itemId)

		lists
			.find(list => list.id === this.state.selectedListId)
			.items
			.splice( itemIndexToDelete, 1);

		this.setState({ lists });
	}

	getSelectedList() {
		return this.state.lists.find(item => item.id === this.state.selectedListId);
	}

	updateSelectedList = (selectedListId) => {
		this.setState({ selectedListId })
	}

	render() {
		return (
			<div className="App">
					<Router>
						<Routes>
							<Route path ="/login" element={ <Login /> }/>
							<Route path ="/signup" element={ Signup }/>
							<PrivateRoute>
								<Route exact path="/" element={
									<div>
										<Header />
										<ListManager
											addList={ this.addList }
											addItem= { this.addItem }
											selectedListId = { this.state.selectedListId }
											updateSelectedList={ this.updateSelectedList }
											lists={ this.state.lists } />
										<List
											deleteItem = { this.deleteItem }
											completeItem = { this.completeItem }
											list={ this.getSelectedList() }/>
										<Navbar />
									</div>
								}/>
								<Route exact path="/stats" element={
									<Statistics lists={ this.state.lists }/>
								}/>
							</PrivateRoute>
						</Routes>
					</Router>
			</div>
		);
	}
}

export default App;
