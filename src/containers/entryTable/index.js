import React, { Component } from 'react';
import { Input, Table } from 'semantic-ui-react';
export class EntryTable extends Component {
	state = {
		data: [ {} ]
	};

	render() {
		const { handleKeyChange, data, handleValueChange, headerKeyPlaceholder, headerValuePlaceholder } = this.props;
		console.log(data);

		return (
			<div className="bodyTablesForm">
				<Table inverted size="small">
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell>Key</Table.HeaderCell>
							<Table.HeaderCell>Values</Table.HeaderCell>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{data.map((keyValuePair, index) => {
							return (
								<Table.Row key={index}>
									<Table.Cell>
										<Input
											fluid
											transparent
											inverted
											placeholder={headerKeyPlaceholder}
											value={keyValuePair.key}
											onChange={(event) => handleKeyChange(event, index)}
										/>
									</Table.Cell>
									<Table.Cell>
										<Input
											fluid
											transparent
											inverted
											placeholder={headerValuePlaceholder}
											value={keyValuePair.value}
											onChange={(event) => handleValueChange(event, index)}
										/>
									</Table.Cell>
								</Table.Row>
							);
						})}
					</Table.Body>
				</Table>
			</div>
		);
	}
}

export default EntryTable;
