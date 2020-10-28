import React from 'react';
import { Layout } from 'antd';
import Main from './containers/main';
import AppHeader from './components/AppHeader';
import './App.css';
const { Header, Footer } = Layout;

function App() {
	return (
		<div className="App">
			<Layout>
				<Header>
					<AppHeader />
				</Header>
				<Main />
				<Footer>Footer</Footer>
			</Layout>
		</div>
	);
}

export default App;
