import React, { Component } from 'react';
import JSONInput from 'react-json-editor-ajrm';
import { Icon, Button } from 'semantic-ui-react';
class Tests extends Component {
	state = {
		reset: false
	};
	resetEditor = () => {
		this.props.clearTests();
		this.setState({ reset: true });
	};
	render() {
		const { objUpdate, testObj } = this.props;
		console.log(this.props);
		return (
			<div align="left" className="testsComponent">
				<p>
					<Button inverted onClick={this.resetEditor} icon labelPosition="left">
						<Icon name="close" />
						Clear Test case
					</Button>
					{/* <Icon onClick={clearTests} link name="close" /> */}
				</p>
				<JSONInput
					value={testObj}
					placeholder={{}}
					className="testsComponent"
					id="123"
					width="100%"
					height="20vh"
					colors={{ background: 'black' }}
					onChange={(arg) => {
						objUpdate(arg);
					}}
				/>
			</div>
		);
	}
}

export default Tests;
