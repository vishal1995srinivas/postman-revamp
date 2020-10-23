import React, { Component } from 'react';
import { Input, Table } from 'semantic-ui-react';
class EntryTable extends Component {
	render() {
		const { handleKeyChange, data, handleValueChange, keyPlaceholder, valuePlaceholder } = this.props;
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
											placeholder={keyPlaceholder}
											value={keyValuePair.key}
											onChange={(event) => handleKeyChange(event, index)}
										/>
									</Table.Cell>
									<Table.Cell>
										<Input
											fluid
											transparent
											inverted
											placeholder={valuePlaceholder}
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
