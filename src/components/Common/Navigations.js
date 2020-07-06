import React from 'react';
import { useHistory } from 'react-router-dom';
import { string, bool } from 'prop-types';

const Navigations = ({ home, back }) => {
	const history = useHistory();
	return (
		<div style={{ display: 'inline' }}>
			{
				home && <i className="fa fa-home fa-2x nav-icon" aria-hidden="true" onClick={() => history.push(home)} />
			}
			{
				back && <i className="fa fa-chevron-left fa-2x nav-icon" aria-hidden="true" onClick={() => history.goBack()} />
			}

		</div>
	);
};

Navigations.propTypes = {
	home: string,
	back: bool,
};


export default Navigations;

