import client from "./client";

export const login = ({ username, password }) =>
	client.post('/account/login', { username, password });

export const register = ({ username, password }) =>
	client.post('/account/register', { username, password });

export const check = () => client.get('/account/check');

export const logout = () => client.post('/account/logout');

