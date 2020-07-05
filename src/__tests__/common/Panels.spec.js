import React from 'react';
import renderer from 'react-test-renderer';
import { HeaderPanel, GenericErrorPanel, Loader } from '../../components/Common/Panels';

describe('Panels', () => {
	it('snapshot renders HeaderPanel Component', () => {
		const HeaderPanelComponent = renderer.create(<HeaderPanel />);
		expect(HeaderPanelComponent.toJSON()).toMatchSnapshot();
	});
	it('snapshot renders GenericErrorPanel Component', () => {
		const GenericErrorPanelComponent = renderer.create(<GenericErrorPanel />);
		expect(GenericErrorPanelComponent.toJSON()).toMatchSnapshot();
	});
	it('snapshot renders LoaderPanelComponent', () => {
		const LoaderPanelComponent = renderer.create(<Loader />);
		expect(LoaderPanelComponent.toJSON()).toMatchSnapshot();
	});
});