import axios from 'axios';

// API Endpoint to be updated with actual one

export const FetchAccountLists = () => {
	return axios.get('/accounts/accounts.json');
};

export const FetchTransactions = (id) => {
	return axios.get(`/accounts/transactions-${id}.json`);
};