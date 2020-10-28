import React, { Component } from 'react';
import { Layout } from 'antd';
import Body from '../body';
import Sidebar from '../sidebar';
import Response from '../response';
import 'semantic-ui-css/semantic.min.css';
import './index.css';
import Title from '../title';
import { getJwt } from '../../helpers/jwt';
import getHistory from '../../db/getHistory';
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
		bodyValue: 'none',
		testObj: null,
		collections: [],
		requestsHistory: [],
		collectionName: '',
		historyLoading: true
	};
	async componentDidMount() {
		const jwt = getJwt();
		let userId = jwt.userId;
		let userToken = jwt.userToken;
		let requestHistory = await getHistory(userId, userToken);
		let topHistory = requestHistory.requests.reverse();
		this.setState({ requestsHistory: topHistory, historyLoading: false });
		// let collections = await getCollections(userId, userToken);
		// let topCollections = collections.reverse();
		// this.setState({ ToSideBarHistory: topHistory, collections: topCollections, historyLoading: false });
	}
	handleSaveToCollectionName = (value) => {
		this.setState({ collectionName: value });
	};
	objUpdate = (arg) => {
		this.setState({ testObj: arg });
	};
	clearTests = () => {
		this.setState({ testObj: null });
	};
	handleBodyDataKeyChange = (event, index) => {
		console.log('object');
		const { bodyData } = this.state;
		let newBodyData = [ ...bodyData ];
		console.log(newBodyData, bodyData);
		newBodyData[index].key = event.target.value;
		console.log(newBodyData);
		this.removeExtraEntry(newBodyData, 'body');
	};
	handleBodyDataValueChange = (event, index) => {
		const { bodyData } = this.state;
		let newBodyData = [ ...bodyData ];
		newBodyData[index].value = event.target.value;
		this.setState({ bodyData: newBodyData });
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
			this.setState({ bodyData: newData });
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
		const {
			sidebar,
			collectionName,
			bodyValue,
			collections,
			bodyData,
			method,
			testObj,
			url,
			sendLoading,
			headerData,
			historyLoading,
			requestsHistory
		} = this.state;
		const {
			onClickSidebarIcon,
			state,
			handleHeaderDataValueChange,
			handleHeaderDataKeyChange,
			handleTitle,
			handleMethod,
			handleUrlChange,
			handleSubmit,
			handleBodyValueChange,
			handleBodyDataValueChange,
			handleBodyDataKeyChange,
			objUpdate,
			clearTests,
			handleSaveToCollectionName
		} = this;
		console.log(sidebar, state, headerData);
		return (
			<div>
				<Layout>
					<div className="main">
						<div className={sidebar}>
							<Sidebar historyLoading={historyLoading} requestsHistory={requestsHistory} />
						</div>
						<Content>
							<Title handleTitle={handleTitle} />
							<Body
								collectionName={collectionName}
								handleSaveToCollectionName={handleSaveToCollectionName}
								collections={collections}
								testObj={testObj}
								objUpdate={objUpdate}
								clearTests={clearTests}
								handleBodyDataKeyChange={handleBodyDataKeyChange}
								handleBodyDataValueChange={handleBodyDataValueChange}
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
