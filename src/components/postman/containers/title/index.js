import React, { Component } from 'react';
import { Input } from 'semantic-ui-react';
import { getJwt } from '../../helpers/jwt';
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import './index.css';

class Title extends Component {
	handleTitle = (event) => {
		this.props.handleTitle(event);
	};
	logOutHandler = (e) => {
		e.preventDefault();
		localStorage.removeItem('user-Details');
		this.props.history.push('/login');
	};
	render() {
		const { title } = this.props;
		const { handleTitle, logOutHandler } = this;
		const jwt = getJwt();
		let username = jwt.userName;
		let letter = username.charAt(0).toUpperCase();
		const menu = (
			<Menu>
				<Menu.Item className="dropDownHeader">
					<a
						target="_blank"
						onClick={(e) => {
							e.preventDefault();
							localStorage.removeItem('user-Details');
							this.props.history.push('/login');
						}}
						className="dropdown"
						rel="noopener noreferrer"
						href="/login"
					>
						Log out
					</a>
				</Menu.Item>
			</Menu>
		);
		return (
			<div className="urlTitle">
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
						<a href="#index" className="dropdown">
							{letter} <DownOutlined />
						</a>
					</Dropdown>
				</div>
			</div>
		);
	}
}
export default withRouter(Title);
