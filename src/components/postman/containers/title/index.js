import React from 'react';
import { Input } from 'semantic-ui-react';
import { getJwt } from '../../helpers/jwt';
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import './index.css';
function Title(props) {
	const handleTitle = (event) => {
		props.handleTitle(event);
	};
	const { title } = props;
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
		<div className="title">
			<Input
				transparent
				fluid
				inverted
				icon="tag"
				iconPosition="left"
				placeholder="Request Title Here"
				className="inputUrl"
				value={title}
				onChange={handleTitle}
			/>
			<div className="loginLetter">
				<Dropdown overlay={menu}>
					<a href="#index" className="dropdown" onClick={(e) => e.preventDefault()}>
						{letter} <DownOutlined />
					</a>
				</Dropdown>
			</div>
		</div>
	);
}
export default Title;
