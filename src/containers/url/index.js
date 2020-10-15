import React, { Component } from 'react';
import { Button, Select, Input, Dropdown, Segment, Icon } from 'semantic-ui-react';
import './index.css';
class Url extends Component {
	state = {
		method: 'GET',
		url: ''
	};
	handleSelect = (data) => {
		this.setState({ method: data.value });
	};
	handleUrlChange = (event) => {
		this.setState({ url: event.target.value });
	};
	handleSubmit = () => {
		const { url } = this.state;
		console.log('Submitting url', url);
	};
	render() {
		const { method, url } = this.state;
		const { handleSelect, handleUrlChange, handleSubmit } = this;
		const options = [
			{
				key: 'get',
				value: 'GET',
				text: 'GET',
				style: { backgroundColor: '#404040', color: 'white' }
			},
			{
				key: 'post',
				value: 'POST',
				text: 'POST',
				style: { backgroundColor: '#404040', color: 'white' }
			},
			{
				key: 'put',
				value: 'PUT',
				text: 'PUT',
				style: { backgroundColor: '#404040', color: 'white' }
			},
			{
				key: 'delete',
				value: 'DELETE',
				text: 'DELETE',
				style: { backgroundColor: '#404040', color: 'white' }
			}
		];
		return (
			<div className="urlComponent">
				<div className="method">
					<Select fluid value={method} options={options} className="selectTag" onChange={handleSelect} />
				</div>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						handleSubmit();
					}}
				>
					<div className="url">
						<Input
							fluid
							transparent
							icon="globe"
							iconPosition="left"
							placeholder="Please enter your API's URL here"
							className="inputUrl"
							value={url}
							onChange={handleUrlChange}
						/>
					</div>
				</form>
				<Button
					primary
					loading={this.props.sendLoading}
					icon
					labelPosition="right"
					className="submitBtn"
					size="medium"
					onClick={this.SubmitHandler}
					disabled={!validUrl.isUri(this.props.url)}
				>
					Send
					<Icon name="send" />
				</Button>
			</div>
		);
	}
}

export default Url;
