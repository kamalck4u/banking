import React from 'react';
import renderer from 'react-test-renderer';
import Navigations from '../../components/Common/Navigations';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';

configure({ adapter: new Adapter() });

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
		wrapper = shallow(<Navigations back='/accounts/1/transactions' />);
		expect(wrapper.find('i.fa-chevron-left')).toHaveLength(1);
	});

	it('should show both home and back button', () => {
		wrapper = shallow(<Navigations home='/accounts' back='/accounts/1/transactions' />);
		expect(wrapper.find('i.fa-home')).toHaveLength(1);
		expect(wrapper.find('i.fa-chevron-left')).toHaveLength(1);
	});
});
