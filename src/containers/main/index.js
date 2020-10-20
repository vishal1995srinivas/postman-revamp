import React, { Component } from 'react';
import { Layout } from 'antd';
import Body from '../body';
import Sidebar from '../sidebar';
import Response from '../response';
import 'semantic-ui-css/semantic.min.css';
import './index.css';
import Title from '../title';
const { Content } = Layout;
class Main extends Component {
	state = {
		sidebar: 'sidebar',
		title: '',
		method: 'GET',
		url: '',
		sendLoading: false
	};
	handleTitle = (event) => {
		this.setState({ title: event.target.value });
	};
	onClickSidebarIcon = () => {
		console.log('clicked on SideBar Click');
		const { sidebar } = this.state;
		let newDivClass = sidebar === 'sidebarOpen' ? 'sidebar' : 'sidebarOpen';
		this.setState({ sidebar: newDivClass });
	};
	handleMethod = (evt, data) => {
		// console.log(evt, data);
		this.setState({ method: data.value });
	};

	handleUrlChange = (event) => {
		this.setState({ url: event.target.value });
	};
	handleSubmit = () => {
		// jus now

		this.setState({ sendLoading: true });
	};
	render() {
		const { sidebar, method, url, sendLoading } = this.state;
		const { onClickSidebarIcon, state, handleTitle, handleMethod, handleUrlChange, handleSubmit } = this;
		console.log(sidebar, state);
		return (
			<div>
				<Layout>
					<div className="main">
						<div className={sidebar}>
							<Sidebar />
						</div>
						<Content>
							<Title handleTitle={handleTitle} />
							<Body
								handleSubmit={handleSubmit}
								sendLoading={sendLoading}
								handleMethod={handleMethod}
								method={method}
								sidebar={sidebar}
								onClickSidebarIcon={onClickSidebarIcon}
								handleUrlChange={handleUrlChange}
								url={url}
							/>
							<Response />
						</Content>
					</div>
				</Layout>
			</div>
		);
	}
}
export default Main;
