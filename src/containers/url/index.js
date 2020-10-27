import React, { Component } from 'react';
import { Button, Select, Input, Icon, Dropdown } from 'semantic-ui-react';
import './index.css';
var validUrl = require('valid-url');
class Url extends Component {
	handleSelect = (data) => {
		this.setState({ method: data.value });
	};
	handleCollectionSelect = (event, data) => {
		this.props.handleSaveToCollectionName(data.value);
	};
	handleSend = () => {
		const { handleSubmit } = this.props;
		console.log('submitting the send');
		handleSubmit();
	};
	render() {
		const { handleSend, handleCollectionSelect } = this;
		const { handleUrlChange, url, handleMethod, method, collectionName, sendLoading } = this.props;
		const collections = this.props.collections.map((collection, index) => {
			return {
				key: collection._id,
				style: { backgroundColor: '#404040', color: 'white' },
				text: collection.collectionName,
				value: collection.collectionName
			};
		});
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
			<div>
				<div className="urlComponent">
					<div className="method">
						<Select fluid value={method} options={options} className="selectTag" onChange={handleMethod} />
					</div>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							handleSend();
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
					<div className="collectionSelect">
						<Dropdown
							disabled={sendLoading || !validUrl.isUri(url)}
							search
							scrolling
							closeOnEscape
							clearable
							options={collections}
							selection
							onChange={handleCollectionSelect}
							value={collectionName}
							fluid
							className="selectTag"
							placeholder="Add"
						/>
					</div>
					<div className="send">
						<Button
							color="blue"
							fluid
							loading={sendLoading}
							icon
							labelPosition="left"
							className="submitBtn"
							size="large"
							onClick={this.handleSend}
							disabled={!validUrl.isUri(url)}
						>
							Send
							<Icon name="send" />
						</Button>
					</div>
					<div />
				</div>
				<div>
					<div className="sendMobile">
						<Button
							color="blue"
							fluid
							loading={sendLoading}
							icon
							labelPosition="right"
							className="submitBtn"
							size="medium"
							onClick={this.handleSend}
							disabled={!validUrl.isUri(url)}
						>
							Send
							<Icon name="send" />
						</Button>
					</div>
				</div>
			</div>
		);
	}
}

export default Url;
