import React from 'react';
import { Label } from 'semantic-ui-react';

function LabelComponent(props) {
	const { title, index, color, method } = props;
	return (
		<div className="label" key={index}>
			<Label as="a" color={color} size="mini">
				{title}
				<Label.Detail>{method}</Label.Detail>
			</Label>
		</div>
	);
}

export default LabelComponent;
