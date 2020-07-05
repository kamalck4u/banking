/*eslint no-undef: 0*/

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import axios from 'axios';
import { FetchAccountLists, FetchTransactions } from '../../apis/FetchAccountDetails';

configure({ adapter: new Adapter() });

jest.mock('axios');

describe('FetchAccountLists', () => {
	it('fetches successfully accounts details from an API', async () => {
		const response = {
			id: 1,
			account_name: 'Savings Account',
			account_type: 'savings',
			balance: 32334.32,
			currency: 'SGD',
			account_number: '342423455344',
			is_active: true
		};
		axios.get.mockImplementationOnce(() => Promise.resolve(response));
		await expect(FetchAccountLists()).resolves.toEqual(response);
		expect(axios.get).toHaveBeenCalledWith('/accounts/accounts.json');
	});

	it('fetches erroneously data from an API', async () => {
		const errorMessage = '403 Forbidden';
		axios.get.mockImplementationOnce(() =>
			Promise.reject(new Error(errorMessage)),
		);
		await expect(FetchAccountLists()).rejects.toThrow(errorMessage);
	});
});


describe('FetchTransactions', () => {
	it('fetches successfully transaction history from an API', async () => {
		const response = {
			'id': 1,
			'account_name': 'Savings Account',
			'account_type': 'savings',
			'balance': 32334.32,
			'currency': 'SGD',
			'account_number': '342423455344',
			'is_active': true
		};
		axios.get.mockImplementationOnce(() => Promise.resolve(response));
		await expect(FetchTransactions(1)).resolves.toEqual(response);
		expect(axios.get).toHaveBeenCalledWith('/accounts/transactions-1.json');
	});

	it('fetches erroneously data from an API', async () => {
		const errorMessage = '403 Forbidden';
		axios.get.mockImplementationOnce(() =>
			Promise.reject(new Error(errorMessage)),
		);
		await expect(FetchTransactions()).rejects.toThrow(errorMessage);
	});
});

