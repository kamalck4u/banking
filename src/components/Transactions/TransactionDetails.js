import React from 'react';
import { HeaderPanel, GenericErrorPanel } from '../Common/Panels';
import Navigations from '../Common/Navigations'
import { REFERENCE_NUMBER, DATE, DESCRIPTION, STATUS, AMOUNT, TRANSACTIONS_DETAILS } from '../Common/Constants';

const TransactionDetails = (props) => {
	const transactionDetails = props.location.state ? props.location.state.transaction : undefined;
	return (
		<React.Fragment>
			<Navigations back />
			{
				transactionDetails ? <HeaderPanel header={TRANSACTIONS_DETAILS} content={transactionDetails.from} /> : <HeaderPanel />
			}
			{
				transactionDetails ?
					<div className="table-responsive">
						<table className="table table-striped">
							<thead className="thead-dark">
								<tr>
									<th scope="col">{REFERENCE_NUMBER}</th>
									<th scope="col">{DATE}</th>
									<th scope="col">{DESCRIPTION}</th>
									<th scope="col">{AMOUNT}</th>
									<th scope="col">{STATUS}</th>
								</tr>
							</thead>
							<tbody>
								<tr key={transactionDetails.id}>
									<td>{transactionDetails.id}</td>
									<td>{transactionDetails.transaction_date}</td>
									<td>{transactionDetails.description}</td>
									<td>{transactionDetails.amount}</td>
									<td>{transactionDetails.transaction_processed === true ? 'Processed' : 'Pending'}</td>
								</tr>
							</tbody>
						</table>
					</div>
					: <GenericErrorPanel />
			}
		</React.Fragment>
	);
};
export default TransactionDetails;