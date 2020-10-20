import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import { faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons';

import './index.css';
import Url from '../url';
export class Body extends Component {
	state = {
		url: '',
		method: '',
		headers: [],
		body: []
	};

	onSideBarIconClick = () => {
		const { onClickSidebarIcon } = this.props;
		onClickSidebarIcon();
	};
	handleSubmit = (method, url) => {
		this.setState({ url: url, method: method });
	};

	render() {
		const { onSideBarIconClick } = this;
		const { sidebar, method, handleMethod, handleUrlChange, url, sendLoading, handleSubmit } = this.props;
		return (
			<div className="content">
				<div>
					<span className="slide">
						<FontAwesomeIcon
							className="openSidebar"
							icon={sidebar === 'sidebar' ? faAngleDoubleRight : faAngleDoubleLeft}
							onClick={onSideBarIconClick}
						/>
					</span>
					<div>
						<Url
							handleSubmit={handleSubmit}
							sendLoading={sendLoading}
							url={url}
							handleUrlChange={handleUrlChange}
							method={method}
							handleMethod={handleMethod}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default Body;
