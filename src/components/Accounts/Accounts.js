import React, { useState } from 'react';
import { FetchAccountLists } from '../../apis/FetchAccountDetails';
import AccountLists from './AccountLists';
import { HeaderPanel, GenericErrorPanel } from '../Common/Panels';
import { WELCOME_TEXT, TAG_LINE } from '../Common/Constants';

const Accounts = () => {
	const [accounts, setAccounts] = useState([]);
	const [error, setError] = useState({});
	const [isLoading, setIsLoading] = useState();

	React.useEffect(() => {
		setIsLoading(true);
		(async () => {
			try {
				const response = await FetchAccountLists();
				setAccounts(response.data);
			} catch (error) {
				setError({ isFailed: true, error: error });
			}
			setIsLoading(false);
		}
		)();
	}, []);

	return (
		<React.Fragment>
			<HeaderPanel header={WELCOME_TEXT} content={TAG_LINE} />
			{
				error.isFailed
					? <GenericErrorPanel />
					: <AccountLists accounts={accounts} isLoading={isLoading} />
			}
		</React.Fragment>
	);
};

export default Accounts;
