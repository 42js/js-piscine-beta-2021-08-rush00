import client from "./client";

export const writePost = ({ title, body }) => client.post('/post', { title, body });
