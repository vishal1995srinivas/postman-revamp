import React, { Component } from 'react';
import { Tab } from 'semantic-ui-react';
import './index.css';

class TabsComponent extends Component {
	render() {
		// history component props
		const { handleHistoryClick, historyLoading, requestsHistory } = this.props;
		//collection component props
		const {
			handlePlayCollection,
			collections,
			collectionName,
			handleDeleteCollection,
			handleCollectionName,
			handleCreateCollection
		} = this.props;

		const panes = [
			{
				menuItem: 'History',
				render: () => (
					<Tab.Pane inverted attached={false}>
						<div className="tabPane">
							History<br />
						</div>
					</Tab.Pane>
				)
			},
			{
				menuItem: 'Collections',
				render: () => (
					<Tab.Pane inverted attached={false}>
						<div className="tabPane">Collections</div>
					</Tab.Pane>
				)
			}
		];
		return <Tab menu={{ inverted: true, pointing: true }} panes={panes} />;
	}
}

export default TabsComponent;
