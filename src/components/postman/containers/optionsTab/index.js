import React, { Component } from 'react';
import { Tab } from 'semantic-ui-react';
import './index.css';
import EntryTable from '../entryTable';
import RadioGroup from './bodyOptions';
import Tests from './test';
class OptionsTab extends Component {
	render() {
		const {
			headerData,
			handleHeaderDataKeyChange,
			handleHeaderDataValueChange,
			bodyValue,
			bodyData,
			handleBodyValueChange,
			handleBodyDataKeyChange,
			handleBodyDataValueChange,
			method,
			objUpdate,
			clearTests,
			testObj
		} = this.props;
		let headerKeyPlaceholder = 'Content-Type';
		let headerValuePlaceholder = 'application/json';
		let bodyKeyPlaceholder = 'userId';
		let bodyValuePlaceholder = '3';
		let panes = [
			{
				menuItem: 'Headers',
				render: () => (
					<Tab.Pane inverted attached={false}>
						<div className="bodyTab">
							* Content-Type : application / json is automatically added. No need of explicit declaration.
							<EntryTable
								keyPlaceholder={headerKeyPlaceholder}
								valuePlaceholder={headerValuePlaceholder}
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
							{bodyValue === 'data' ? (
								<div className="bodyTab">
									<EntryTable
										keyPlaceholder={bodyKeyPlaceholder}
										valuePlaceholder={bodyValuePlaceholder}
										data={bodyData}
										handleKeyChange={handleBodyDataKeyChange}
										handleValueChange={handleBodyDataValueChange}
									/>
								</div>
							) : bodyValue === 'url-encoded' ? (
								<div className="bodyTab">
									<EntryTable
										keyPlaceholder={bodyKeyPlaceholder}
										valuePlaceholder={bodyValuePlaceholder}
										data={bodyData}
										handleKeyChange={handleBodyDataKeyChange}
										handleValueChange={handleBodyDataValueChange}
									/>
								</div>
							) : bodyValue === 'raw' ? (
								<div>This feature is under construction</div>
							) : (
								<div>none</div>
							)}
						</div>
					</Tab.Pane>
				)
			},
			{
				menuItem: 'Test Case',
				render: () => (
					<Tab.Pane inverted attached={false}>
						<div className="bodyTab">
							<div className="bodyTab">
								<Tests objUpdate={objUpdate} clearTests={clearTests} testObj={testObj} />
							</div>
						</div>
					</Tab.Pane>
				)
			}
		];
		if (method === 'GET') {
			panes.splice(1, 1);
		}
		return <Tab menu={{ inverted: true, pointing: true }} panes={panes} />;
	}
}

export default OptionsTab;
