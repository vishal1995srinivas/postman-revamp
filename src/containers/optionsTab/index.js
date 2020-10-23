import React, { Component } from 'react';
import { Tab } from 'semantic-ui-react';
import './index.css';
import EntryTable from '../entryTable';
import RadioGroup from './bodyOptions';

class OptionsTab extends Component {
	render() {
		const {
			headerData,
			handleHeaderDataKeyChange,
			handleHeaderDataValueChange,
			bodyValue,
			bodyData,
			handleBodyValueChange
		} = this.props;
		let headerKeyPlaceholder = 'Content-Type';
		let headerValuePlaceholder = 'application/json';
		const panes = [
			{
				menuItem: 'Headers',
				render: () => (
					<Tab.Pane inverted attached={false}>
						<div className="bodyTab">
							* Content-Type : application / json is automatically added. No need of explicit declaration.
							<EntryTable
								headerKeyPlaceholder={headerKeyPlaceholder}
								headerValuePlaceholder={headerValuePlaceholder}
								data={headerData}
								handleKeyChange={handleHeaderDataKeyChange}
								handleValueChange={handleHeaderDataValueChange}
							/>
						</div>
					</Tab.Pane>
				)
			},
			{
				menuItem: 'Body',
				render: () => (
					<Tab.Pane inverted attached={false}>
						<div className="bodyTab">
							<RadioGroup
								bodyData={bodyData}
								bodyValue={bodyValue}
								handleBodyValueChange={handleBodyValueChange}
							/>
						</div>
					</Tab.Pane>
				)
			},
			{
				menuItem: 'Test Case',
				render: () => (
					<Tab.Pane inverted attached={false}>
						<div className="bodyTab">Test Case</div>
					</Tab.Pane>
				)
			}
		];
		return <Tab menu={{ inverted: true, pointing: true }} panes={panes} />;
	}
}

export default OptionsTab;
