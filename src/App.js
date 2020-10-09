import React from 'react';
import { Layout } from 'antd';
import Body from './containers/body';
const { Header, Footer, Sider, Content } = Layout;

function App() {
	return (
		<div className="App">
			<Layout>
				<Header>Header</Header>
				<Layout>
					<Sider className="sider">Sider</Sider>
					<Content>
						<Body />
					</Content>
				</Layout>
				<Footer>Footer</Footer>
			</Layout>
		</div>
	);
}

export default App;
