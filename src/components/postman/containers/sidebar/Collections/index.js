import React, { Component } from 'react';
// import { withAlert } from 'react-alert';
import LabelComponent from './label';
import SegmentComponent from './segmentComponent';
import Collections from './collections';
import './index.css';
class CollectionsComponent extends Component {
	state = {
		activeIndex: -1
	};

	handleClick = (e, titleProps) => {
		const { index } = titleProps;
		const { activeIndex } = this.state;
		const newIndex = activeIndex === index ? -1 : index;
		this.setState({ activeIndex: newIndex });
	};
	handlePlay = (event, index) => {
		console.log(index);
		this.props.handlePlayCollection(index);
		//console.log(this.state.collections[index]);
	};
	handleDelete = (event, index) => {
		this.props.handleDeleteCollection(event, index);
	};
	handleCollectionName = (event) => {
		this.props.handleCollectionName(event.target.value);
	};
	handleCreateCollection = (event) => {
		this.props.handleCreateCollection();
	};

	render() {
		console.log(this.props);
		const { activeIndex } = this.state;
		//console.log(this.props.collections)
		let result = null;
		let labels = 'No requests in the collection';
		if (this.props.collections.length > 0) {
			result = this.props.collections.map((collections, index) => {
				//console.log(collections);
				if (collections.requests.length > 0) {
					labels = collections.requests.map((requests, index) => {
						if (requests == null) {
							return null;
						}
						let title = null;
						let color = 'green';
						if (requests.title === '' || requests.title == null) {
							title = requests.url;
						} else {
							title = requests.title;
						}
						if (requests.method === 'POST') {
							color = 'yellow';
						}
						if (requests.method === 'PUT') {
							color = 'blue';
						}
						if (requests.method === 'DELETE') {
							color = 'red';
						}
						return (
							<LabelComponent
								key={index}
								index={index}
								color={color}
								method={requests.method}
								title={title}
							/>
						);
					});
					return (
						<SegmentComponent
							key={index}
							index={index}
							handleClick={this.handleClick}
							handleDelete={this.handleDelete}
							handlePlay={this.handlePlay}
							labels={labels}
							collectionName={collections.collectionName}
							activeIndex={activeIndex}
						/>
					);
				} else {
					return (
						<SegmentComponent
							key={index}
							index={index}
							handleClick={this.handleClick}
							handleDelete={this.handleDelete}
							collectionName={collections.collectionName}
							activeIndex={activeIndex}
						/>
					);
				}
			});
		}
		return (
			<Collections
				handleCreateCollection={this.handleCreateCollection}
				handleCollectionName={this.handleCollectionName}
				collectionName={this.props.collectionName}
				result={result}
			/>
		);
	}
}

// export default withAlert()(CollectionsComponent);
export default CollectionsComponent;
