import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import { faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons';

import './index.css';
import Url from '../url';
import OptionsTab from '../optionsTab';
class Body extends Component {
	onSideBarIconClick = () => {
		const { onClickSidebarIcon } = this.props;
		onClickSidebarIcon();
	};

	render() {
		const { onSideBarIconClick } = this;
		const {
			sidebar,
			method,
			handleMethod,
			headerData,
			handleHeaderDataKeyChange,
			handleHeaderDataValueChange,
			handleUrlChange,
			url,
			sendLoading,
			handleSubmit,
			bodyValue,
			bodyData,
			handleBodyValueChange,
			handleBodyDataKeyChange,
			handleBodyDataValueChange,
			objUpdate,
			clearTests,
			testObj,
			collections,
			handleSaveToCollectionName,
			collectionName
		} = this.props;

		return (
			<div className="bodyContent">
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
							collectionName={collectionName}
							handleSaveToCollectionName={handleSaveToCollectionName}
							collections={collections}
							handleSubmit={handleSubmit}
							sendLoading={sendLoading}
							url={url}
							handleUrlChange={handleUrlChange}
							method={method}
							handleMethod={handleMethod}
						/>
					</div>
					<div className="tabs">
						<OptionsTab
							handleBodyDataKeyChange={handleBodyDataKeyChange}
							handleBodyDataValueChange={handleBodyDataValueChange}
							handleBodyValueChange={handleBodyValueChange}
							bodyData={bodyData}
							bodyValue={bodyValue}
							method={method}
							testObj={testObj}
							objUpdate={objUpdate}
							clearTests={clearTests}
							headerData={headerData}
							handleHeaderDataKeyChange={handleHeaderDataKeyChange}
							handleHeaderDataValueChange={handleHeaderDataValueChange}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default Body;
