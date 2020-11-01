import React, { Component } from 'react';
import Tests from './Tests';
import ResponseTabComponent from './ResponseTabComponent';
import DisplayReplica from './testCollection/DisplayReplica';
import './index.css';
class Response extends Component {
	render() {
		const {
			sendSwitch,
			testCase,
			method,
			ToPlay,
			url,
			headers,
			bodyFormOrUrlData,
			responseSwitch,
			SendLoadingSwitch
		} = this.props;
		if (responseSwitch === true && url !== '') {
			if (sendSwitch === true) {
				if (testCase !== null && testCase !== 'null' && testCase !== '') {
					return (
						<div className="response">
							<Tests
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
