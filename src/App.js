import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Accounts from './components/Accounts/Accounts';
import Transactions from './components/Transactions/Transactions';
import TransactionDetails from './components/Transactions/TransactionDetails';

const App = () => {
	return (
		<div className="ui container-md" style={{ marginTop: '15px' }}>
			<BrowserRouter>
				<div>
					<Switch>
						<Route path="/accounts" exact component={Accounts} />
						<Route path="/accounts/:id/transactions" exact component={Transactions} />
						<Route path="/transactions/:id/details" exact component={TransactionDetails} />
						<Route path="/" component={Accounts} />
					</Switch>
				</div>
			</BrowserRouter>
		</div>
	);
};
export default App;
