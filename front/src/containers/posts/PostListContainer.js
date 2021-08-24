import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PostList from '../../components/posts/PostsList';
import { listPosts } from '../../modules/posts';

const PostListContainer = ({ location, match }) => {
	const dispatch = useDispatch();
	const { posts, error, loading, user } = useSelector(
		({ posts, loading, user }) => ({
			posts: posts.posts,
			error: posts.error,
			loading: loading['posts/LIST_POSTS'],
			user: user.user,
		})
	);
	useEffect(() => {
		// const { username } = match.params;
		dispatch(listPosts());
	}, [dispatch, location.search, match.params]);

	return (
		<PostList
			loading={loading}
			error={error}
			posts={posts}
			showWriteButton={user}
		/>
	);
};

export default withRouter(PostListContainer);
