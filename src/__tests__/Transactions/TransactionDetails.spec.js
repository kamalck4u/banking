import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, configure } from 'enzyme';
import TransactionDetails from '../../components/Transactions/TransactionDetails';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const transaction = {
	'id': 1,
	'account_id': 1,
	'description': 'Test Description',
	'from': 'Savings Account - 342423455344',
	'transaction_date': '2019-06-08T03:37:28 -08:00',
	'transaction_processed': true,
	'amount': '$1,000.10'
};

let location = {
	state: {
		transaction: transaction
	}
};

describe('Transaction Details', () => {
	it('snapshot renders', () => {
		const TransactionListsComponent = renderer.create(<TransactionDetails location={location} />);
		expect(TransactionListsComponent.toJSON()).toMatchSnapshot();
	});
});

describe('Transaction Details', () => {
	let wrapper;
	beforeEach(() => {
		wrapper = shallow(<TransactionDetails location={location} />);
	});

	it('should show the transaction table headers', () => {
		expect(wrapper.find('th')).toHaveLength(5);
		expect(wrapper.find('th').getElements()[0].props.children).toEqual('Transaction#');
		expect(wrapper.find('th').getElements()[1].props.children).toEqual('Date');
		expect(wrapper.find('th').getElements()[2].props.children).toEqual('Description');
		expect(wrapper.find('th').getElements()[3].props.children).toEqual('Amount');
		expect(wrapper.find('th').getElements()[4].props.children).toEqual('Status');
	});

	it('should render the transaction details', () => {
		expect(wrapper.find('td')).toHaveLength(5);
		expect(wrapper.find('td').getElements()[0].props.children).toEqual(1);
		expect(wrapper.find('td').getElements()[1].props.children).toEqual('2019-06-08T03:37:28 -08:00');
		expect(wrapper.find('td').getElements()[2].props.children).toEqual('Test Description');
		expect(wrapper.find('td').getElements()[3].props.children).toEqual('$1,000.10');
		expect(wrapper.find('td').getElements()[4].props.children).toEqual('Processed');
	});

	it('should should transaction status as pending if not processed', () => {
		transaction.transaction_processed = false;
		wrapper = shallow(<TransactionDetails location={location} />);
		expect(wrapper.find('td').getElements()[4].props.children).toEqual('Pending');
	});

	it('should display account details on header panel', () => {
		expect(wrapper.find('HeaderPanel').props()).toEqual({ 'content': 'Savings Account - 342423455344', 'header': 'Transaction Details' });
	});

});
describe('Error', () => {
	it('should show generic error', () => {
		location = {};
		let wrapper = shallow(<TransactionDetails location={location} />);
		expect(wrapper.find('GenericErrorPanel')).toHaveLength(1);
	});
});

