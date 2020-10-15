import React from 'react';
import { Input } from 'semantic-ui-react';
import './index.css';
function Title(props) {
	const handleTitle = (event) => {
		props.handleTitle(event);
	};
	const { title } = props;

	return (
		<div className="title">
			<Input
				transparent
				fluid
				inverted
				icon="tag"
				iconPosition="left"
				placeholder="Request Title Here"
				className="inputUrl"
				value={title}
				onChange={handleTitle}
			/>
		</div>
	);
}
export default Title;
