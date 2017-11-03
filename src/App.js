import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import ContributorList from './components/ContributorList';
import Header from './components/Header';

class App extends Component {
	filterList(event) {
		let updatedList = this.state.initialItems;
		let letters = event.target.value.toLowerCase();
		updatedList = updatedList.filter(function(item) {
			return item.login.toLowerCase().startsWith(letters);
		});
		this.setState({ items: updatedList });
	}

	voteUp(contributor) {
		let contributorId = contributor.id;
		let updatedList = this.state.items;
		let indexOfContributor = updatedList.findIndex(
			contributor => contributor.id === contributorId
		);
		updatedList[indexOfContributor].upVotes =
			updatedList[indexOfContributor].upVotes + 1 || 1;

		this.setState({ items: updatedList });
	}

	voteDown(contributor) {
		let contributorId = contributor.id;
		let updatedList = this.state.items;
		let indexOfContributor = updatedList.findIndex(
			contributor => contributor.id === contributorId
		);
		updatedList[indexOfContributor].downVotes =
			updatedList[indexOfContributor].downVotes + 1 || 1;

		this.setState({ items: updatedList });
	}

	state = {
		initialItems: [],
		items: []
	};

	componentWillMount() {
		axios
			.get('https://api.github.com/repos/reactjs/redux/contributors')
			.then(response =>
				this.setState({
					items: response.data,
					initialItems: response.data
				})
			);
	}

	render() {
		return (
			<div className="container">
				<div className="container">
					<Header />
					<input
						type="text"
						placeholder="Search"
						onChange={this.filterList.bind(this)}
					/>
					<ContributorList
						contributors={this.state.items}
						voteUp={this.voteUp}
						voteDown={this.voteDown}
						that={this}
					/>
				</div>
			</div>
		);
	}
}

export default App;
