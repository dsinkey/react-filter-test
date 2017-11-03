import React, { Component } from 'react';

class ContributorList extends Component {
	renderContributorList() {
		return this.props.contributors.map(contributor => {
			return (
				<div className="card horizontal" key={contributor.id}>
					<div className="card-image">
						<img
							src={contributor.avatar_url}
							height="150"
							width="150"
							alt="contributor"
						/>
					</div>
					<div className="card-stacked">
						<p style={{ marginLeft: '20px' }} className="card-title">
							{contributor.login}
						</p>
						<div className="card-action">
							<button
								className="btn"
								onClick={this.props.voteUp.bind(this.props.that, contributor)}
							>
								Vote Up: {contributor.upVotes || 0}
							</button>
							<button
								className="btn"
								style={{ marginLeft: '5px' }}
								onClick={this.props.voteDown.bind(this.props.that, contributor)}
							>
								Vote Down: {contributor.downVotes || 0}
							</button>
						</div>
					</div>
				</div>
			);
		});
	}

	render() {
		return <div>{this.renderContributorList()}</div>;
	}
}

export default ContributorList;
