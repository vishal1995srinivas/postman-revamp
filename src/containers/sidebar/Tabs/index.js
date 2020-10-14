import React, { Component } from 'react';
import { Tab } from 'semantic-ui-react';
import './index.css';

class TabsComponent extends Component {
	render() {
		const panes = [
			{
				menuItem: 'History',
				render: () => (
					<Tab.Pane inverted attached={false}>
						<div className="tabPane">
							History<br />
						</div>
					</Tab.Pane>
				)
			},
			{
				menuItem: 'Collections',
				render: () => (
					<Tab.Pane inverted attached={false}>
						<div className="tabPane">Collections</div>
					</Tab.Pane>
				)
			}
		];
		return <Tab menu={{ inverted: true, pointing: true }} panes={panes} />;
	}
}

export default TabsComponent;
