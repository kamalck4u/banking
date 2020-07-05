import React from 'react';
import { ERROR_HEADER, ERROR_DESCRIPTION, ERROR_ADDITONAL_INFO } from './Constants';

export const HeaderPanel = ({ header, content, description }) => {
	return (
		<div className="jumbotron panel-header">
			<h1 className="display-4">{header}</h1>
			<p className="lead">{content}</p>
			<hr className="my-4" />
			<p>{description} </p>
		</div>
	);
};


export const GenericErrorPanel = () => {
	return (
		<div className="card mb-3">
			<div className="card-body" style={{ textAlign: 'center' }}>
				<h5 className="card-title">
					<i className="fa fa-exclamation-triangle fa-lg" style={{ color: 'red' }} aria-hidden="true">
					</i> {ERROR_HEADER}
				</h5>
				<p className="card-text">{ERROR_DESCRIPTION}</p>
				<p className="card-text"><small className="text-muted">{ERROR_ADDITONAL_INFO}</small></p>
			</div>
		</div>
	);
};


export const Loader = ({ loaderText }) => {
	return (
		<div className="card">
			<div className="card-header">
				<div className="card-body">
					<h3 style={{ textAlign: 'center' }}>{loaderText}</h3>
					<div className="d-flex justify-content-center">
						<div className="spinner-border" role="status">
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};