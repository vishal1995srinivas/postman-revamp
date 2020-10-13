import React, { Component } from 'react';
import { Layout } from 'antd';
import Body from '../body';
import Sidebar from '../sidebar';
import Response from '../response';
import 'semantic-ui-css/semantic.min.css';
import './index.css';
const { Content } = Layout;
class Main extends Component {
	state = {
		sidebar: 'sidebar'
	};
	onClickSidebarIcon = () => {
		console.log('clicked on SideBar Click');
		const { sidebar } = this.state;
		let newDivClass = sidebar === 'sidebarOpen' ? 'sidebar' : 'sidebarOpen';
		this.setState({ sidebar: newDivClass });
	};

	render() {
		const { sidebar } = this.state;
		const { onClickSidebarIcon } = this;
		console.log(sidebar);
		return (
			<div>
				<Layout>
					<div className="main">
						<div className={sidebar}>
							<Sidebar />
						</div>
						<Content>
							<Body sidebar={sidebar} onClickSidebarIcon={onClickSidebarIcon} />
							<Response />
						</Content>
					</div>
				</Layout>
			</div>
		);
	}
}
export default Main;
