import client from "./client";

export const writePost = ({ title, body }) => client.post('/post', { title, body });

export const readPost = id => client.get(`/post/${id}`);

export const listPosts = () => {

	console.log('??')
	return client.get(`/post`);
};

export const updatePost = ({ id, title, body }) =>
	client.patch(`/post/${id}`, {
		title,
		body,
	});

export const removePost = id => client.delete(`/post/${id}`);
