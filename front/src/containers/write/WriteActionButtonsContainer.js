import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { withRouter } from "react-router-dom";
import WriteActionButtons from "../../components/write/WriteActionButtons";
import { updatePost, writePost } from "../../modules/write";

const WriteActionButtonsContainer = ({ history }) => {
	const dispatch = useDispatch();
	const { title, body, post, postError, originalPostId } = useSelector(({ write }) => ({
		title: write.title,
		body: write.body,
		post: write.post,
		postError: write.postError,
		originalPostId: write.originalPostId,
	}));

	const onPublish = () => {
		if (originalPostId) {
			dispatch(updatePost({ title, body, id: originalPostId }));
			return;
		}
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
	return <WriteActionButtons onPublish={onPublish} onCancel={onCancel} isEdit={!!originalPostId} />;
};

export default withRouter(WriteActionButtonsContainer);
