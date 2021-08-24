import client from "./client";
import qs from "qs";

export const writePost = ({ title, body }) => client.post('/api/posts', { title, body });

export const readPost = id => client.get(`/api/posts/${id}`);

export const listPosts = ({ page, username }) => {
	const queryString = qs.stringify({
		page,
		username,
	});
	return client.get(`/api/posts?${queryString}`);
};

export const updatePost = ({ id, title, body }) =>
	client.patch(`/api/posts/${id}`, {
		title,
		body,
	});

export const removePost = id => client.delete(`/api/posts/${id}`);
