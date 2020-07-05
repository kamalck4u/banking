import React, { useEffect, useState } from 'react';
import { FetchTransactions } from '../../apis/FetchAccountDetails';
import TransactionLists from './TransactionLists';
import { GenericErrorPanel, HeaderPanel } from '../Common/Panels';
import { TRANSACTIONS_HISTORY } from '../Common/Constants';

const Transactions = (props) => {
	const [transactions, setTransactions] = useState([]);
	const [error, setError] = useState({});
	const { id } = props.match.params;
	const account = props.location.state ? props.location.state.account : undefined;
	const [isLoading, setIsLoading] = useState();

	useEffect(() => {
		setIsLoading(true);
		(async () => {
			try {
				const response = await FetchTransactions(id);
				setTransactions(response.data);
			} catch (error) {
				setError({ isFailed: true, error: error });
			}
			setIsLoading(false);
		})();
	}, [id]);

	return (
		<React.Fragment>
			{
				account ? <HeaderPanel header={TRANSACTIONS_HISTORY} content={`${account.account_name} - ${account.account_number}`} /> : <HeaderPanel />
			}
			{
				error.isFailed
					? <GenericErrorPanel />
					: <TransactionLists transactions={transactions} isLoading={isLoading} />
			}
		</React.Fragment>
	);
};

export default Transactions;