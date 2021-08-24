import client from "./client";

export const login = ({ username, password }) =>
	client.post('/auth/api/login', { username, password });

export const register = ({ username, password }) =>
	client.post('/auth/api/register', { username, password });

export const check = () => client.get('/auth/api/check');

export const logout = () => client.post('/auth/api/logout');

