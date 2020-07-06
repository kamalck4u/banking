import React from 'react';
import { useHistory } from 'react-router-dom';
import { REFERENCE_NUMBER, DATE, AMOUNT, LOADER_TEXT_TRANSACTIONS } from '../Common/Constants';
import { Loader } from '../Common/Panels';
import '../../App.css';
import { array, bool } from 'prop-types';

const TransactionLists = ({ transactions, isLoading }) => {
	const history = useHistory();
	return (
		<React.Fragment>
			{
				isLoading ? <Loader loaderText={LOADER_TEXT_TRANSACTIONS} /> :
					<div className="table-responsive">
						<table className="table table-striped">
							<thead className="thead-dark">
								<tr>
									<th scope="col">{REFERENCE_NUMBER}</th>
									<th scope="col">{DATE}</th>
									<th scope="col">{AMOUNT}</th>
								</tr>
							</thead>
							<tbody className="row-clickable">
								{transactions.map((transaction) => {
									return (
										<tr key={transaction.id} className="clickable-row table-cell" onClick={() => history.push(`/transactions/${transaction.id}/details`, { transaction })}>
											<td>{transaction.id}</td>
											<td>{transaction.transaction_date}</td>
											<td>{transaction.amount}</td>
										</tr>
									);
								}
								)}
							</tbody>
						</table>
					</div>
			}
		</React.Fragment>
	);
};

TransactionLists.propTypes = {
	transactions: array,
	isLoading: bool
};

export default TransactionLists;


