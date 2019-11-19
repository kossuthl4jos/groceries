import React, { Component } from 'react';
import './App.css';

import { sandwich, bolognese } from './gateway/fake-gateway'

import Lists from './components/Lists'

class App extends Component {

	state = {
		lists: [...sandwich, ...bolognese]
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
				<Lists lists={ this.state.lists } />
			</div>
		);
	}
}

export default App;
