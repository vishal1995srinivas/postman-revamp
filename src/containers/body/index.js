import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import { faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons';

import './index.css';
import Url from '../url';
export class Body extends Component {
	state = {};

	onSideBarIconClick = () => {
		const { onClickSidebarIcon } = this.props;
		onClickSidebarIcon();
	};
	render() {
		const { onSideBarIconClick } = this;
		const { sidebar, method, handleMethod } = this.props;
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
						<Url method={method} handleMethod={handleMethod} />
					</div>
				</div>
			</div>
		);
	}
}

export default Body;
