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
		//send button
		sendLoading: false,
		headerData: [ { key: '', value: '' } ],
		bodyData: [ { key: '', value: '' } ],
		// none, form-data, url-encoded
		bodyValue: ''
	};
	handleHeaderDataKeyChange = (event, index) => {
		const { headerData } = this.state;
		let newHeaderData = [ ...headerData ];
		console.log(newHeaderData, headerData);
		newHeaderData[index].key = event.target.value;
		console.log(newHeaderData);
		this.removeExtraEntry(newHeaderData, 'header');
	};

	removeExtraEntry = (data, tab) => {
		console.log(data);
		let newData = data.filter((entry) => {
			if (entry.key !== '') {
				return entry;
			}
		});
		console.log(newData);
		this.addNewEntry(newData, tab);
	};
	addNewEntry = (newData, tab) => {
		console.log(newData);
		let newEntry = { key: '', value: '' };
		newData.push(newEntry);
		if (tab === 'header') {
			this.setState({ headerData: newData });
		} else if (tab === 'body') {
		}
	};
	handleHeaderDataValueChange = (event, index) => {
		const { headerData } = this.state;
		let newHeaderData = [ ...headerData ];
		newHeaderData[index].value = event.target.value;
		this.setState({ headerData: newHeaderData });
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
	handleBodyValueChange = (e, { value }) => this.setState({ bodyValue: value });
	render() {
		const { sidebar, bodyValue, bodyData, method, url, sendLoading, headerData } = this.state;
		const {
			onClickSidebarIcon,
			state,
			handleHeaderDataValueChange,
			handleHeaderDataKeyChange,
			handleTitle,
			handleMethod,
			handleUrlChange,
			handleSubmit,
			handleBodyValueChange
		} = this;
		console.log(sidebar, state, headerData);
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
								headerData={headerData}
								handleHeaderDataKeyChange={handleHeaderDataKeyChange}
								handleHeaderDataValueChange={handleHeaderDataValueChange}
								bodyValue={bodyValue}
								bodyData={bodyData}
								handleBodyValueChange={handleBodyValueChange}
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
