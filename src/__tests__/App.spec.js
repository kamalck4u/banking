import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter } from 'react-router';
import Accounts from '../components/Accounts/Accounts';
import Transactions from '../components/Transactions/Transactions';
import TransactionDetails from '../components/Transactions/TransactionDetails';
import App from '../App';

configure({ adapter: new Adapter() });
jest.mock('firebase/app');

describe('App', () => {
	it('should redirect to accounts page', () => {
		const wrapper = mount(
			<MemoryRouter initialEntries={['/accounts']}>
				<App />
			</MemoryRouter>
		);
		expect(wrapper.find(Accounts)).toHaveLength(1);
	});


	it('should redirect to default page', () => {
		const wrapper = mount(
			<MemoryRouter initialEntries={['/']}>
				<App />
			</MemoryRouter>
		);
		expect(wrapper.find(Accounts)).toHaveLength(1);
	});

	it('should redirect to transaction history page', () => {
		const wrapper = mount(
			<MemoryRouter initialEntries={['/accounts/1/transactions']}>
				<App />
			</MemoryRouter>
		);
		expect(wrapper.find(Transactions)).toHaveLength(1);
	});

	it('should redirect to transaction Details page', () => {
		const wrapper = mount(
			<MemoryRouter initialEntries={['/transactions/1/details']}>
				<App />
			</MemoryRouter>
		);
		expect(wrapper.find(TransactionDetails)).toHaveLength(1);
	});
});

