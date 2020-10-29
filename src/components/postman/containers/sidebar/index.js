import React, { Component } from 'react';
import './index.css';
import TabsComponent from './Tabs';
class Sidebar extends Component {
	closeSideMenu = () => {
		console.log('Clicked on close side menu');
	};
	render() {
		const {
			sidebar,
			historyLoading,
			handlePlayCollection,
			requestsHistory,
			handleDeleteCollection,
			handleCreateCollection,
			collections,
			collectionName,
			handleCollectionName
		} = this.props;
		return (
			<div className={sidebar}>
				<TabsComponent
					collections={collections}
					collectionName={collectionName}
					handlePlayCollection={handlePlayCollection}
					handleDeleteCollection={handleDeleteCollection}
					handleCreateCollection={handleCreateCollection}
					handleCollectionName={handleCollectionName}
					historyLoading={historyLoading}
					requestsHistory={requestsHistory}
				/>
			</div>
		);
	}
}

export default Sidebar;
