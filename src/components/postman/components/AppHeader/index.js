import React from 'react';
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import './index.css';
import { getJwt } from '../../helpers/jwt';
import logo from '../../images/2.png';
function AppHeader() {
	const jwt = getJwt();
	let username = jwt.userName;
	let letter = username.charAt(0).toUpperCase();
	const menu = (
		<Menu>
			<Menu.Item className="dropDownHeader">
				<a target="_blank" className="dropdown" rel="noopener noreferrer" href="http://www.alipay.com/">
					Log out
				</a>
			</Menu.Item>
		</Menu>
	);
	return (
		<div className="header">
			<div className="logo">
				<img className="logoImg" src={logo} alt="" />
			</div>
			<div>
				<Dropdown overlay={menu}>
					<a href="#index" className="dropdown" onClick={(e) => e.preventDefault()}>
						{letter} <DownOutlined />
					</a>
				</Dropdown>
			</div>
		</div>
	);
}

export default AppHeader;
