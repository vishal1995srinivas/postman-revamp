import React, { Component } from 'react';
import { Label, List } from 'semantic-ui-react';
import Skeleton from 'react-skeleton-loader';
import './index.css';
class HistoryComponent extends Component {
	handleLabelSelect = (event, url, method, title, data, headers, testJson) => {
		this.props.handleHistoryClick(url, method, title, data, headers, testJson);
	};
	render() {
		const { handleLabelSelect } = this;
		const { historyLoading, requestsHistory } = this.props;
		if (historyLoading === false) {
			// history has been loaded
			if (requestsHistory.length > 0) {
				// history details is not null
				let labels = requestsHistory.map((requests, index) => {
					let title = null;
					let Untitled = 'Untitled Request';
					let color = 'green';
					if (requests.title === '' || requests.title == null) {
						title = Untitled;
					} else {
						if (requests.title.length > 16) {
							title = requests.title.substring(0, 16);
							title = `${title}...`;
						} else title = requests.title;
					}
					if (requests.method === 'POST') {
						color = 'yellow';
					} else if (requests.method === 'PUT') {
						color = 'blue';
					} else if (requests.method === 'DELETE') {
						color = 'red';
					}
					return (
						<div className="label" key={index}>
							<List divided selection>
								<List.Item
									onClick={(e) => {
										handleLabelSelect(
											e,
											`${requests.url}`,
											`${requests.method}`,
											`${title}`,
											`${requests.data}`,
											`${requests.headers}`,
											`${requests.testJson}`
										);
									}}
								>
									<Label color={color} horizontal className="exampleMethod">
										{requests.method}
									</Label>
									<div className="example">{title}</div>
								</List.Item>
							</List>
						</div>
					);
				});
				return (
					<div className="history" align="left">
						{labels}
					</div>
				);
			} else {
				// if requestsHistory is null
				return <div className="history">No Requests yet!</div>;
			}
		} else {
			// loader displayed
			return (
				<div>
					<div>
						<Skeleton count={50} color="#131414" width="100%" animated={false} />
					</div>
				</div>
			);
		}
	}
}

export default HistoryComponent;
