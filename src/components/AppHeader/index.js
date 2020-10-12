import React from 'react';
import './index.css';
import logo from '../../images/logo.png';
function AppHeader() {
	return (
		<div className="header">
			<div className="logo">
				<img className="logoImg" src={logo} alt="" />
			</div>
		</div>
	);
}

export default AppHeader;
