import React, { Component } from 'react';
import { Button, Select, Input, Dropdown, Segment, Icon } from 'semantic-ui-react';
import './index.css';
class Url extends Component {
	handleSelect = (event, data) => {
		this.props.handleMethod(event, data);
	};
	render() {
		const { method } = this.props;
		const { handleSelect } = this;
		const options = [
			{ key: 'get', value: 'GET', text: 'GET' },
			{ key: 'post', value: 'POST', text: 'POST' },
			{ key: 'put', value: 'PUT', text: 'PUT' },
			{ key: 'delete', value: 'DELETE', text: 'DELETE' }
		];
		return (
			<div className="urlComponent">
				<div className="method">
					<Select fluid value={method} options={options} className="selectTag" onChange={handleSelect} />
				</div>
			</div>
		);
	}
}

export default Url;
