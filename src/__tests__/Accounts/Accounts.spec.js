import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, configure } from 'enzyme';
import Accounts from '../../components/Accounts/Accounts';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('Accounts', () => {
	it('snapshot renders', () => {
		const Accountscomponent = renderer.create(<Accounts />);
		expect(Accountscomponent.toJSON()).toMatchSnapshot();
	});
});

describe('Accounts Home page', () => {
	let wrapper;
	beforeEach(() => {
		wrapper = shallow(<Accounts />);
	});

	it('should display welcome message', () => {
		expect(wrapper.find('HeaderPanel').props()).toEqual({ content: 'Building the Future of Trade Finance', header: 'Welcome CONTOUR' });
	});

	it('should render AccountLists component', () => {
		expect(wrapper.find('AccountLists')).toHaveLength(1);
	});

	it('should not render GenericErrorPanel component', () => {
		expect(wrapper.find('GenericErrorPanel')).toHaveLength(0);
	});
});

