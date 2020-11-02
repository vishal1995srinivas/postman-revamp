import React, { Component } from 'react';
import ReactJson from 'react-json-view';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Skeleton from 'react-skeleton-loader';
import { theme } from './Utils';
import GetData from './testCollection/GetData';
import fetchData from './testCollection/FetchData';
import fetchFunction from './fetchFunction';
import './index.css';
class ResponseTabComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			urlString: '',
			error: '',
			JsonData: '',
			headers: [ {} ],
			method: '',
			bodyFormOrUrlData: [ {} ],
			collectionJson: null,
			collectionName: null
		};
	}
	async componentDidMount() {
		const { method, url, headers, bodyFormOrUrlData } = this.props;
		if (
			method !== this.state.method ||
			url !== this.state.url ||
			headers !== this.state.headers ||
			bodyFormOrUrlData !== this.state.bodyFormOrUrlData
		) {
			let fetchData = await fetchFunction(method, headers, url, bodyFormOrUrlData);
			console.log('fetch data', fetchData);
			this.props.setResponse(fetchData);
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
		if (
			method !== prevProps.method ||
			url !== prevProps.url ||
			headers !== prevProps.headers ||
			bodyFormOrUrlData !== prevProps.bodyFormOrUrlData
		) {
			let fetchData = await fetchFunction(method, headers, url, bodyFormOrUrlData);
			console.log('fetch data', fetchData);
			this.props.setResponse(fetchData);
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

	// static getDerivedStateFromProps = async (props, state) => {
	// 	console.log('executing sgdsfp');
	// 	const { method, url, headers, bodyFormOrUrlData } = props;
	// 	if (
	// 		method !== state.method ||
	// 		url !== state.url ||
	// 		headers !== state.headers ||
	// 		bodyFormOrUrlData !== state.bodyFormOrUrlData
	// 	) {
	// 		let fetchData = await fetchFunction(method, headers, url, bodyFormOrUrlData);
	// 		console.log('fetch data', fetchData);
	// 		return {
	// 			isLoading: false,
	// 			urlString: url,
	// 			error: null,
	// 			JsonData: fetchData,
	// 			headers: headers,
	// 			method: method,
	// 			bodyFormOrUrlData: bodyFormOrUrlData
	// 		};
	// 	}
	// 	return null;
	// };
	render() {
		const { url } = this.props;
		console.log(this.props, this.state);
		const { isLoading, error, JsonData, urlString, method, headers, bodyFormOrUrlData } = this.state;
		if (isLoading === true) {
			return (
				<div>
					<Skeleton count={10} color="#1b1c1d" width="100%" animated={false} />
					{/* <Loader type="ThreeDots" color="black" height={100} width={100} /> */}
				</div>
			);
		} else if (this.state.JsonData) {
			return (
				<div className="responseContent" align="left">
					<ReactJson src={JsonData} theme={theme} />
				</div>
			);
		}
	}
}
export default ResponseTabComponent;
