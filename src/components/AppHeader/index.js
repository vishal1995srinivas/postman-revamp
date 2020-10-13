import React from 'react';
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import './index.css';
import logo from '../../images/2.png';
// TODO : 1. add user login info and dropDown for logout
function AppHeader() {
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
						Hover me <DownOutlined />
					</a>
				</Dropdown>
			</div>
		</div>
	);
}

export default AppHeader;
