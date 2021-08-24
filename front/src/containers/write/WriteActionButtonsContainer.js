import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { withRouter } from "react-router-dom";
import WriteActionButtons from "../../components/write/WriteActionButtons";
import { writePost } from "../../modules/write";

const WriteActionButtonsContainer = ({ history }) => {
	const dispatch = useDispatch();
	const { title, body, post, postError } = useSelector(({ write }) => ({
		title: write.title,
		body: write.body,
		post: write.post,
		postError: write.postError,
	}));

	const onPublish = () => {
		// if (originalPostId) {
		// 	dispatch(updatePost({ title, body, id: originalPostId }));
		// 	return;
		// }
		dispatch(
			writePost({
				title,
				body,
			}),
		);
	};

	const onCancel = () => {
		history.goBack();
	};

	useEffect(() => {
		if (post) {
			const { _id, user } = post;
			history.push(`/@${user.username}/${_id}`);
		}
		if (postError) {
			console.log(postError);
		}
	}, [history, post, postError]);
	return <WriteActionButtons onPublish={onPublish} onCancel={onCancel} />;
};

export default withRouter(WriteActionButtonsContainer);
