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
import getCollections from '../../db/getCollections';
import addRequestToCollection from '../../db/addRequestToCollection';
import createCollection from '../../db/createCollection';
import DeleteCollectionById from '../../db/deleteCollectionById';
import createRequest from '../../db/createRequest';
import { withAlert } from 'react-alert';
const { Content } = Layout;
class Main extends Component {
	state = {
		sidebar: 'sidebar',
		title: '',
		method: 'GET',
		responseSwitch: false,
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
		historyLoading: true,
		sendSwitch: true,
		ToPlay: null
	};
	async componentDidMount() {
		const jwt = getJwt();
		let userId = jwt.userId;
		let userToken = jwt.userToken;
		let requestsHistory = await getHistory(userId, userToken);
		let topHistory = requestsHistory.requests.reverse();
		let collections = await getCollections(userId, userToken);
		let topCollections = collections.reverse();
		this.setState({ requestsHistory: topHistory, historyLoading: false, collections: topCollections });
	}
	handleSaveToCollectionName = (value) => {
		this.setState({ collectionName: value });
	};
	handleCollectionName = (value) => {
		this.setState({ collectionName: value });
	};
	objUpdate = (arg) => {
		this.setState({ testObj: arg });
	};
	clearTests = () => {
		this.setState({ testObj: null });
	};
	toggleToPlayOff = () => {
		this.setState({ ToPlay: null });
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
	handleHistoryClick = (url, method, title, data, headers, testJson) => {
		console.log(url, method, title, data, headers, testJson);
		this.setState({
			url: url,
			method: method,
			title: title
		});
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
	saveToDb = async (title, method, url, collectionName, headerData, bodyData, testObj) => {
		const jwt = getJwt();
		let userId = jwt.userId;
		let userToken = jwt.userToken;
		let request;
		const { collections } = this.state;
		if (collectionName !== '' && collectionName !== null) {
			request = {
				userId: `${userId}`,
				url: url,
				method: method,
				title: title,
				headers: headerData,
				data: bodyData,
				collectionName: collectionName,
				testJson: testObj
			};

			try {
				let addRequest = await addRequestToCollection(request, userToken);
				console.log(addRequest);

				this.props.alert.success(`Successfully saved to ${collectionName} Collection`);
			} catch (error) {
				this.props.alert.error(`Error Saving to  Database`);
			}
		} else {
			request = {
				userId: `${userId}`,
				url: url,
				method: method,
				title: title,
				data: bodyData,
				headers: headerData,
				testJson: testObj
			};
			try {
				let requestAdded = await createRequest(userToken, request);
				console.log(requestAdded);
				this.props.alert.success(`Successfully saved to Requests`);
			} catch (error) {
				this.props.alert.error(`Error Saving to  Database`);
			}
		}
	};
	removeExtraHeaderData = (headerData) => {
		let newHeaderData = [ ...headerData ];
		newHeaderData.forEach((data, index) => {
			if (data.value === 'application/json') {
				newHeaderData.splice(index, 1);
				this.removeExtraHeaderData(newHeaderData);
			}
		});
		return newHeaderData;
	};
	sendLoadingSwitch = () => {
		this.setState({ sendLoading: false });
	};
	handleSubmit = () => {
		//TODO add to sidebar history,
		// if GET, pass to one fn, (method, url, collName, headerData(add app/json), testObj, userToken)
		const {
			method,
			url,
			collectionName,
			title,
			requestsHistory,
			headerData,
			bodyData,
			testObj,
			collections,
			responseSwitch
		} = this.state;
		let newCollectionName;
		let newHeaderData = headerData.slice(0, headerData.length - 1);
		// remove application/json present if any
		newHeaderData = this.removeExtraHeaderData(newHeaderData);
		newHeaderData.push({
			key: 'Content-Type',
			value: 'application/json'
		});
		// body Data
		let newBodyFormData = bodyData.slice(0, bodyData.length - 1);
		console.log(newBodyFormData);
		if (collectionName === '') {
			newCollectionName = null;
		} else newCollectionName = collectionName;

		const { bodyValue } = this.state;
		if (bodyValue === 'data') {
			newHeaderData.push({
				key: 'Content-Type',
				value: 'multipart/form-data'
			});
		} else if (bodyValue === 'url-encoded') {
			newHeaderData.push({
				key: 'Content-Type',
				value: 'application/x-www-form-urlencoded'
			});
		} else if (bodyValue === 'raw') {
		}
		//this.saveToDb(title, method, url, newCollectionName, newHeaderData, newBodyFormData, testObj);

		// if POST, pass to one fn, (method, url, collName, headerData(add app/json), testObj, userToken)
		// jus now
		let newHistory = [ ...requestsHistory ];
		if (collectionName === '') {
			let newEntry = {
				data: newBodyFormData,
				headers: newHeaderData,
				url,
				method,
				testJson: testObj,
				title
			};
			newHistory.unshift(newEntry);
			this.setState({
				sendLoading: true,
				responseSwitch: true,
				bodyData: newBodyFormData,
				headerData: newHeaderData,
				requestsHistory: newHistory
			});
		} else {
			let newEntry = {
				data: newBodyFormData,
				headers: newHeaderData,
				url,
				method,
				testJson: testObj,
				title
			};
			newHistory.unshift(newEntry);
			collections.forEach((collection) => {
				if (collection.collectionName === collectionName) {
					collection.requests.push({
						title: this.state.title,
						method: method,
						url: url,
						headers: headerData,
						bodyFormOrUrlData: bodyData,
						testCase: testObj
					});
				}
			});
			console.log(newBodyFormData);
			this.setState({
				collections: collections,
				headerData: newHeaderData,
				sendLoading: true,
				requestsHistory: newHistory,
				bodyData: newBodyFormData,
				responseSwitch: true
			});
		}
	};
	handleDeleteCollection = async (event, index) => {
		try {
			/**Add delete flag dont remove from database in the next update*********** */
			const jwt = getJwt();
			let userToken = jwt.userToken;
			let CollectionToBeDeleted = this.state.collections[index];
			//console.log(CollectionToBeDeleted);
			let idOfTheCollectionIs = CollectionToBeDeleted.id;
			//console.log(idOfTheCollectionIs);
			let deleteCollection = await DeleteCollectionById(userToken, idOfTheCollectionIs);
			/******************************************************* */
			console.log(deleteCollection);
			let collectionAfterDelete = this.state.collections.filter((collection) => {
				return collection.id !== idOfTheCollectionIs;
			});
			this.setState({ collections: collectionAfterDelete });
			this.props.alert.success('Collection Deleted Successfully');
		} catch (error) {
			console.log(error);
			this.props.alert.error('Collection cannot be deleted. Try again later!');
		}
	};
	handlePlayCollection = (index) => {
		this.setState({ ToPlay: this.state.collections[index], sendSwitch: false });
	};
	handleCreateCollection = (event) => {
		let collectionExist = false;
		const { collectionName, collections } = this.state;
		if (collectionName !== '') {
			collections.map((collection) => {
				if (collection.collectionName === collectionName) {
					this.props.alert.error(`${collectionName} already exists`);
					collectionExist = true;
				}
			});
			if (collectionExist === false) {
				let newCollection = [
					{
						collectionName: collectionName,
						requests: []
					},
					...collections
				];
				/******************** */
				const jwt = getJwt();
				let userId = jwt.userId;
				let userToken = jwt.userToken;
				let result = createCollection(userId, userToken, collectionName);
				console.log(result);
				/**************************** */
				this.setState({ collections: newCollection, collectionName: '' });
				this.props.alert.success(`Collection ${collectionName} Created successfully`);
			}
		} else {
			this.props.alert.error('Collection Name cannot be empty');
		}
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
			requestsHistory,
			sendSwitch,
			responseSwitch,
			ToPlay
		} = this.state;
		const {
			onClickSidebarIcon,
			toggleToPlayOff,
			handleHistoryClick,
			sendLoadingSwitch,
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
			handleCreateCollection,
			handlePlayCollection,
			handleSaveToCollectionName,
			handleCollectionName,
			handleDeleteCollection
		} = this;
		console.log(sidebar, state, headerData);
		let testJson;
		if (testObj === null) {
			testJson = testObj;
		} else testJson = testObj.jsObject;
		return (
			<div>
				<Layout>
					<div className="main">
						<div className={sidebar}>
							<Sidebar
								handleHistoryClick={handleHistoryClick}
								handlePlayCollection={handlePlayCollection}
								handleDeleteCollection={handleDeleteCollection}
								handleCreateCollection={handleCreateCollection}
								handleCollectionName={handleCollectionName}
								collections={collections}
								collectionName={collectionName}
								historyLoading={historyLoading}
								requestsHistory={requestsHistory}
							/>
						</div>
						<Content>
							<Title handleTitle={handleTitle} />
							<Body
								collectionName={collectionName}
								handleSaveToCollectionName={handleSaveToCollectionName}
								collections={collections}
								testObj={testJson}
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
							<Response
								sendSwitch={sendSwitch}
								method={method}
								url={url}
								headers={headerData}
								bodyFormOrUrlData={bodyData}
								ToPlay={ToPlay}
								ToggleToPlayOff={toggleToPlayOff}
								testCase={testJson}
								sendLoading={sendLoading}
								responseSwitch={responseSwitch}
								SendLoadingSwitch={sendLoadingSwitch}
							/>
						</Content>
					</div>
				</Layout>
			</div>
		);
	}
}
export default withAlert()(Main);
