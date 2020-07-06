import React from 'react';
import renderer from 'react-test-renderer';
import Navigations from '../../components/Common/Navigations';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';

configure({ adapter: new Adapter() });

const mockHistoryPush = jest.fn();
const mockHistoryGoBack = jest.fn();

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useHistory: () => ({
		push: mockHistoryPush,
		goBack: mockHistoryGoBack
	}),
}));


describe('Navigations', () => {
	it('snapshot renders navigations', () => {
		const HeaderPanelComponent = renderer.create(<Navigations />);
		expect(HeaderPanelComponent.toJSON()).toMatchSnapshot();
	});
});


describe('Navigations', () => {
	let wrapper;

	it('should show home button', () => {
		wrapper = shallow(<Navigations home='/accounts' />);
		expect(wrapper.find('i.fa-home')).toHaveLength(1);
	});
	it('should show back button', () => {
		wrapper = shallow(<Navigations back />);
		expect(wrapper.find('i.fa-chevron-left')).toHaveLength(1);
	});

	beforeEach(() => {
		wrapper = shallow(<Navigations home='/accounts' back />);
	})

	it('should show both home and back button', () => {
		expect(wrapper.find('i.fa-home')).toHaveLength(1);
		expect(wrapper.find('i.fa-chevron-left')).toHaveLength(1);
	});

	it('should redirect to Home page', () => {
		wrapper.find('i.fa-home').at(0).simulate('click');
		expect(mockHistoryPush).toHaveBeenCalledWith('/accounts');
	});

	it('should redirect to Home page', () => {
		wrapper.find('i.fa-chevron-left').at(0).simulate('click');
		expect(mockHistoryGoBack).toHaveBeenCalled();
	});

});
