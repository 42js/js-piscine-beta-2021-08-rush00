import { useEffect } from "react";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux"
import WriteEditor from "../../components/write/Editor";
import { changeField, initialize } from "../../modules/write";

const EditorContainer = () => {
	const dispatch = useDispatch();
	const { title, body } = useSelector(({ write }) => ({
		title: write.title,
		body: write.body,
	}));
	const onChangeField = useCallback(payload => dispatch(changeField(payload)), [
		dispatch,
	]);

	useEffect(() => {
		return () => {
			dispatch(initialize());
		};
	}, [dispatch]);
	return <WriteEditor onChangeField={onChangeField} title={title} body={body} />;
};

export default EditorContainer;
