import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, configure } from 'enzyme';
import TransactionLists from '../../components/Transactions/TransactionLists';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const transactions = [{
	'id': 1,
	'account_id': 1,
	'description': 'Dolore quis ad et mollit nisi excepteur ex anim fugiat quis ipsum exercitation proident cupidatat. Quis anim incididunt excepteur cupidatat aliquip nulla reprehenderit velit. Dolor pariatur velit consectetur dolore aliquip reprehenderit non aliqua consectetur. Sunt aliquip consequat et in eu aute.\r\n',
	'from': 'Savings Account - 342423455344',
	'transaction_date': '2019-06-08T03:37:28 -08:00',
	'transaction_processed': true,
	'amount': '$1,000.10'
}];

let isloading = false;
const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useHistory: () => ({
		push: mockHistoryPush,
	}),
}));

describe('TransactionLists', () => {
	it('snapshot renders', () => {
		const TransactionListsComponent = renderer.create(<TransactionLists transactions={transactions} isLoading={isloading} />);
		expect(TransactionListsComponent.toJSON()).toMatchSnapshot();
	});
});

describe('Transaction List', () => {
	let wrapper;
	beforeEach(() => {
		wrapper = shallow(<TransactionLists transactions={transactions} isLoading={isloading} />);
	});

	it('should show the table headers', () => {
		expect(wrapper.find('th')).toHaveLength(3);
		expect(wrapper.find('th').getElements()[0].props.children).toEqual('Transaction#');
		expect(wrapper.find('th').getElements()[1].props.children).toEqual('Date');
		expect(wrapper.find('th').getElements()[2].props.children).toEqual('Amount');

	});

	it('should render the table rows', () => {
		expect(wrapper.find('td')).toHaveLength(3);
		expect(wrapper.find('td').getElements()[0].props.children).toEqual(1);
		expect(wrapper.find('td').getElements()[1].props.children).toEqual('2019-06-08T03:37:28 -08:00');
		expect(wrapper.find('td').getElements()[2].props.children).toEqual('$1,000.10');
	});

	it('should be clickable', () => {
		expect(wrapper.find('tbody.row-clickable')).toHaveLength(1);
		expect(wrapper.find('tr.clickable-row.table-cell')).toHaveLength(1);
	});

	it('should redirect to transaction Details page', () => {
		wrapper.find('tr').at(1).simulate('click');
		expect(mockHistoryPush).toHaveBeenCalledWith('/transactions/1/details', {
			transaction: {
				'id': 1,
				'account_id': 1,
				'description': 'Dolore quis ad et mollit nisi excepteur ex anim fugiat quis ipsum exercitation proident cupidatat. Quis anim incididunt excepteur cupidatat aliquip nulla reprehenderit velit. Dolor pariatur velit consectetur dolore aliquip reprehenderit non aliqua consectetur. Sunt aliquip consequat et in eu aute.\r\n',
				'from': 'Savings Account - 342423455344',
				'transaction_date': '2019-06-08T03:37:28 -08:00',
				'transaction_processed': true,
				'amount': '$1,000.10'
			}
		});
	});
});

describe('Panel', () => {
	let wrapper;
	it('should show spinner while data is being fetched', () => {
		isloading = true;
		wrapper = shallow(<TransactionLists transactions={transactions} isLoading={isloading} />);
		expect(wrapper.find('Loader').props()).toEqual({ loaderText: 'Your transactions are being loaded, please wait...' });
		expect(wrapper.find('th')).toHaveLength(0);
	});
});

