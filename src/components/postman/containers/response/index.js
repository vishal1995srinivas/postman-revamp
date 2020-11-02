import React, { Component } from 'react';
import Tests from './Tests';
import ReactJson from 'react-json-view';
import ResponseTabComponent from './ResponseTabComponent';
import DisplayReplica from './testCollection/DisplayReplica';
import './index.css';
import { theme } from './Utils';
class Response extends Component {
	state = {
		data: null,
		collectionData: null
	};
	setResponse = (res) => {
		this.setState({ data: res });
	};
	setCollectionData = (data) => {
		this.setState({ collectionData: data });
	};
	render() {
		const {
			sendSwitch,
			sendLoading,
			testCase,
			method,
			ToPlay,
			url,
			headers,
			bodyFormOrUrlData,
			responseSwitch,
			SendLoadingSwitch
		} = this.props;
		const { data, collectionData } = this.state;
		const { setResponse, setCollectionData } = this;
		// responseSwitch == false -> uri type, true-> response

		if (data !== null || sendLoading === true) {
			if (sendLoading === true) {
				if (sendSwitch === true) {
					if (testCase !== null && testCase !== 'null' && testCase !== '') {
						return (
							<div className="response">
								<Tests
									setResponse={setResponse}
									testCase={testCase}
									method={method}
									url={url}
									headers={headers}
									bodyFormOrUrlData={bodyFormOrUrlData}
									SendLoadingSwitch={SendLoadingSwitch}
								/>
							</div>
						);
					} else {
						console.log(this.props);
						return (
							<div className="response">
								<ResponseTabComponent
									setResponse={setResponse}
									method={method}
									url={url}
									headers={headers}
									bodyFormOrUrlData={bodyFormOrUrlData}
									SendLoadingSwitch={SendLoadingSwitch}
								/>
							</div>
						);
					}
				} else {
					//console.log(this.props.ToPlay);
					return (
						<div className="response">
							<DisplayReplica ToPlay={ToPlay} />
						</div>
					);
				}
			} else {
				return (
					<div className="responseContent" align="left">
						<ReactJson src={data} theme={theme} />
					</div>
				);
			}
		} else if (collectionData !== null || ToPlay !== null) {
			console.log(this.props.ToPlay);
			return (
				<div className="response">
					<DisplayReplica ToPlay={ToPlay} setCollectionData={setCollectionData} />
				</div>
			);
		} else {
			console.log(this.props);
			return (
				<div className="responseBefore">
					<div className="loaderInResponse">&#8734;</div>
					<div className="loaderText">Type URI to fetch data ⬆</div>
				</div>
			);
		}
	}
}
export default Response;
