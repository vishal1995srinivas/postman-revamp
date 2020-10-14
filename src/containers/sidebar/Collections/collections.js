import React from 'react';
import { Input } from 'semantic-ui-react';

function Collections(props) {
	const { handleCreateCollection, handleCollectionName, collectionName, result } = props;
	return (
		<div className="collections">
			<form
				onSubmit={(e) => {
					e.preventDefault();
					handleCreateCollection();
				}}
			>
				<div className="inputCollection">
					<Input
						transparent
						fluid
						inverted
						icon="folder"
						iconPosition="left"
						placeholder="New Collection Name + Enter"
						onChange={handleCollectionName}
						value={collectionName}
					/>
				</div>
			</form>
			{result}
		</div>
	);
}

export default Collections;
