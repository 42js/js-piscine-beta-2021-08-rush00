import client from "./client";

export const writePost = ({ title, body }) => client.post('/api/posts', { title, body });
