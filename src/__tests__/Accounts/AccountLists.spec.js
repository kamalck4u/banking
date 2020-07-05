import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, configure } from 'enzyme';
import AccountLists from '../../components/Accounts/AccountLists';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const accounts = [{
	id: '1',
	account_number: '119998888',
	account_type: 'saving plus',
	account_name: 'savings',
	currency: 'SGD',
	balance: '100'
}];

let isloading = false;
const mockHistoryPush = jest.fn();


jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useHistory: () => ({
		push: mockHistoryPush,
	}),
}));

describe('AccountLists', () => {
	it('snapshot renders', () => {
		const AccountListsComponent = renderer.create(<AccountLists accounts={accounts} isLoading={isloading} />);
		expect(AccountListsComponent.toJSON()).toMatchSnapshot();
	});
});


describe('Accounts List Table', () => {
	let wrapper;
	beforeEach(() => {
		wrapper = shallow(<AccountLists accounts={accounts} isLoading={isloading} />);
	});

	it('should show the account table headers', () => {
		expect(wrapper.find('th')).toHaveLength(5);
		expect(wrapper.find('th').getElements()[0].props.children).toEqual('Account Number');
		expect(wrapper.find('th').getElements()[1].props.children).toEqual('Account Name');
		expect(wrapper.find('th').getElements()[2].props.children).toEqual('Account Type');
		expect(wrapper.find('th').getElements()[3].props.children).toEqual('Currency');
		expect(wrapper.find('th').getElements()[4].props.children).toEqual('Balance');
	});

	it('should render the account details', () => {
		expect(wrapper.find('td')).toHaveLength(5);
		expect(wrapper.find('td').getElements()[0].props.children).toEqual('119998888');
		expect(wrapper.find('td').getElements()[1].props.children).toEqual('savings');
		expect(wrapper.find('td').getElements()[2].props.children).toEqual('saving plus');
		expect(wrapper.find('td').getElements()[3].props.children).toEqual('SGD');
		expect(wrapper.find('td').getElements()[4].props.children).toEqual('100');
	});

	it('should be clickable', () => {
		expect(wrapper.find('tbody.row-clickable')).toHaveLength(1);
		expect(wrapper.find('tr.clickable-row.table-cell')).toHaveLength(1);
	});

	it('should redirect to transaction history page', () => {
		wrapper.find('tr').at(1).simulate('click');
		expect(mockHistoryPush).toHaveBeenCalledWith('/accounts/1/transactions', {
			account: {
				id: '1',
				account_number: '119998888',
				account_type: 'saving plus',
				account_name: 'savings',
				currency: 'SGD',
				balance: '100'
			}
		});
	});

});

describe('Panel', () => {
	let wrapper;
	it('should show loading spinner while data is being fetched', () => {
		isloading = true;
		wrapper = shallow(<AccountLists accounts={accounts} isLoading={isloading} />);
		expect(wrapper.find('Loader').props()).toEqual({ loaderText: 'Your portfolio is being loaded, please wait...' });
		expect(wrapper.find('th')).toHaveLength(0);
	});
});

