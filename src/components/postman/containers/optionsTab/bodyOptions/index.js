import React, { Component } from 'react';
import { Form, Radio, Segment } from 'semantic-ui-react';
import './index.css';
class RadioGroup extends Component {
	render() {
		const { handleBodyValueChange, bodyValue } = this.props;
		return (
			<Form className="bodyForm">
				<Form.Field>
					<Segment compact inverted size="mini">
						<Radio
							label="None"
							name="radioGroup"
							value="none"
							className="radioButton"
							checked={bodyValue === 'none'}
							onChange={handleBodyValueChange}
						/>
					</Segment>
				</Form.Field>
				<Form.Field>
					<Segment compact inverted size="mini">
						<Radio
							label="Form data"
							name="radioGroup"
							value="data"
							className="radioButton"
							checked={bodyValue === 'data'}
							onChange={handleBodyValueChange}
						/>
					</Segment>
				</Form.Field>
				<Form.Field>
					<Segment compact inverted size="mini">
						<Radio
							label="Form url-encoded"
							name="radioGroup"
							value="url-encoded"
							className="radioButton"
							checked={bodyValue === 'url-encoded'}
							onChange={handleBodyValueChange}
						/>
					</Segment>
				</Form.Field>
				<Form.Field>
					<Segment compact inverted size="mini">
						<Radio
							label="Raw"
							name="radioGroup"
							value="raw"
							className="radioButton"
							checked={bodyValue === 'raw'}
							onChange={handleBodyValueChange}
						/>
					</Segment>
				</Form.Field>
			</Form>
		);
	}
}
export default RadioGroup;
