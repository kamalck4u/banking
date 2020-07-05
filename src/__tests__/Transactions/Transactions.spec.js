import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, configure } from 'enzyme';
import Transactions from '../../components/Transactions/Transactions';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const account = {
	'id': 1,
	'account_name': 'Bonus Savings Account',
	'account_type': 'savings',
	'balance': -5.11,
	'currency': 'AUD',
	'account_number': '156478245',
	'is_active': true
};


const match = {
	params: { id: 1 },
	isExact: true,
	path: '',
	url: ''
};

const location = {
	state: {
		account: account
	}
};

describe('Transactions', () => {
	it('snapshot renders', () => {
		const Transactionscomponent = renderer.create(<Transactions match={match} location={location} />);
		expect(Transactionscomponent.toJSON()).toMatchSnapshot();
	});
});

describe('Transactions Home page', () => {
	let wrapper;
	beforeEach(() => {
		wrapper = shallow(<Transactions match={match} location={location} />);
	});

	it('should display account name & number on header panel', () => {
		expect(wrapper.find('HeaderPanel').props()).toEqual({ content: 'Bonus Savings Account - 156478245', header: 'Transaction History' });
	});

	it('should render AccountLists component', () => {
		expect(wrapper.find('TransactionLists')).toHaveLength(1);
	});

	it('should not render GenericErrorPanel component', () => {
		expect(wrapper.find('GenericErrorPanel')).toHaveLength(0);
	});
});

