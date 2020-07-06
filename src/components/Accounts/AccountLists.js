import React from 'react';
import { useHistory } from 'react-router-dom';
import { ACCOUNT_NUMBER, ACCOUNT_NAME, ACCOUNT_TYPE, CURRENCY, ACCOUNT_BALANCE, LOADER_TEXT_ACCOUNTS } from '../Common/Constants';
import '../../App.css';
import { Loader } from '../Common/Panels';
import { array, bool } from 'prop-types';

const AccountLists = ({ accounts, isLoading }) => {
	const history = useHistory();
	return (
		<React.Fragment>
			{
				isLoading ? <Loader loaderText={LOADER_TEXT_ACCOUNTS} />
					:
					<div className="table-responsive">
						<table className="table table-striped">
							<thead className="thead-dark">
								<tr>
									<th scope="col">{ACCOUNT_NUMBER}</th>
									<th scope="col">{ACCOUNT_NAME}</th>
									<th scope="col">{ACCOUNT_TYPE}</th>
									<th scope="col">{CURRENCY}</th>
									<th scope="col">{ACCOUNT_BALANCE}</th>
								</tr>
							</thead>
							<tbody className="row-clickable">
								{accounts.map((account) => {
									return (
										<tr key={account.id} className="clickable-row table-cell" onClick={() => history.push(`/accounts/${account.id}/transactions`, { account })}>
											<td>{account.account_number}</td>
											<td>{account.account_name}</td>
											<td>{account.account_type}</td>
											<td>{account.currency}</td>
											<td>{account.balance}</td>
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

AccountLists.propTypes = {
	accounts: array,
	isLoading: bool
}

export default AccountLists;
