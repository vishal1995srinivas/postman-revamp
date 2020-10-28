import React, { Component } from 'react';
import './index.css';
import TabsComponent from './Tabs';
class Sidebar extends Component {
	closeSideMenu = () => {
		console.log('Clicked on close side menu');
	};
	render() {
		const { sidebar, historyLoading, requestsHistory } = this.props;
		return (
			<div className={sidebar}>
				<TabsComponent historyLoading={historyLoading} requestsHistory={requestsHistory} />
			</div>
		);
	}
}

export default Sidebar;
