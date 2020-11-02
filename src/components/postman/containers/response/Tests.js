import React, { Component } from 'react';
import ReactJson from 'react-json-view';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Skeleton from 'react-skeleton-loader';
import { theme } from './Utils';
import { diff } from 'json-diff';
import GetData from './testCollection/GetData';
import fetchData from './testCollection/FetchData';
import fetchFunction from './fetchFunction';
import locale from 'react-json-editor-ajrm/locale/en';
class Tests extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			urlString: '',
			error: false,
			JsonData: '',
			headers: [ {} ],
			method: '',
			bodyFormOrUrlData: [ {} ],
			collectionJson: null,
			collectionName: null
		};
	}

	async componentDidMount() {
		let json;
		const { method, url, headers, bodyFormOrUrlData } = this.props;
		if (
			method !== this.state.method ||
			url !== this.state.url ||
			headers !== this.state.headers ||
			bodyFormOrUrlData !== this.state.bodyFormOrUrlData
		) {
			let fetchData = await fetchFunction(method, headers, url, bodyFormOrUrlData);
			console.log(fetchData);
			let changes = diff(fetchData, this.props.testCase);
			if (changes === undefined) {
				json = {
					TestCase: 'Perfectly Matched',
					Operation: 'Success'
				};

				this.props.setResponse(json);
			} else {
				this.props.setResponse(changes);
			}
			this.props.SendLoadingSwitch();
			this.setState({
				isLoading: false,
				urlString: url,
				error: null,
				JsonData: fetchData,
				headers: headers,
				method: method,
				bodyFormOrUrlData: bodyFormOrUrlData
			});
		}
	}

	async componentDidUpdate(prevProps, prevState) {
		const { method, url, headers, bodyFormOrUrlData } = this.props;
		let json;
		if (
			method !== prevProps.method ||
			url !== prevProps.url ||
			headers !== prevProps.headers ||
			bodyFormOrUrlData !== prevProps.bodyFormOrUrlData
		) {
			let fetchData = await fetchFunction(method, headers, url, bodyFormOrUrlData);
			console.log(fetchData);
			console.log('fetch data', fetchData);
			let changes = diff(fetchData, this.props.testCase);
			if (changes === undefined) {
				json = {
					TestCase: 'Perfectly Matched',
					Operation: 'Success'
				};

				this.props.setResponse(json);
			} else {
				this.props.setResponse(changes);
			}
			this.props.SendLoadingSwitch();
			this.setState({
				isLoading: false,
				urlString: url,
				error: null,
				JsonData: fetchData,
				headers: headers,
				method: method,
				bodyFormOrUrlData: bodyFormOrUrlData
			});
		}
	}
	render() {
		console.log(this.props);
		const { url } = this.props;
		const { isLoading, error, JsonData, urlString, method, headers, bodyFormOrUrlData } = this.state;
		if (isLoading === true) {
			return (
				<div>
					<Skeleton count={10} color="#2b2b2b" width="100%" animated={false} />
				</div>
			);
		} else if (this.state.JsonData) {
			return (
				<div className="response" align="left">
					<ReactJson locale={locale} src={JsonData} theme={theme} sortKeys />
				</div>
			);
		}
	}
}
export default Tests;
