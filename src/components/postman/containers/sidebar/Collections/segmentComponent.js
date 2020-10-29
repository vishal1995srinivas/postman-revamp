import React from 'react';
import { Accordion, Icon, Segment } from 'semantic-ui-react';

function SegmentComponent(props) {
	const { index, handleClick, handleDelete, handlePlay, labels, collectionName, activeIndex } = props;
	return (
		<div className="collections" align="left" key={index}>
			<Segment inverted>
				<Accordion fluid inverted className="accordion">
					<Accordion.Title active={activeIndex === { index }} index={index} onClick={handleClick}>
						{collectionName}
						<div>
							{labels !== 'No requests in the collection' && (
								<Icon className="iconPlay" name="play" onClick={(event) => handlePlay(event, index)} />
							)}
							<Icon
								className="iconPlay" //Create a separate classname in css as same as play
								name="trash"
								onClick={(event) => handleDelete(event, index)}
							/>
						</div>
					</Accordion.Title>
					<Accordion.Content active={activeIndex === index}>{labels}</Accordion.Content>
				</Accordion>
			</Segment>
		</div>
	);
}

export default SegmentComponent;
