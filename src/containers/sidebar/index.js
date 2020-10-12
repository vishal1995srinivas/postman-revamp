import React, { Component } from 'react';
import './index.css';
class Sidebar extends Component {
	closeSideMenu = () => {
		console.log('Clicked on close side menu');
	};
	render() {
		const { closeSideMenu } = this;
		const { sidebar } = this.props;
		return <div className={sidebar} />;
	}
}

export default Sidebar;
