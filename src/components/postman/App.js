import React from 'react';
import { Layout } from 'antd';
import Main from './containers/main';
import AlertTemplate from 'react-alert-template-basic';
import AppHeader from './components/AppHeader';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import './App.css';
const { Header, Footer } = Layout;
const options = {
	// you can also just use 'bottom center'
	position: positions.BOTTOM_CENTER,
	timeout: 3000,
	offset: '30px',
	// you can also just use 'scale'
	transition: transitions.SCALE
};
function App() {
	return (
		<div className="App">
			<AlertProvider template={AlertTemplate} {...options}>
				<Layout>
					<Main />
					<Footer>Footer</Footer>
				</Layout>
			</AlertProvider>
		</div>
	);
}

export default App;
