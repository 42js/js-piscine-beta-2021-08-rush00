import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import styled from 'styled-components';
import Responsive from '../common/Responsive';
import palette from '../../lib/styles/palette';
import { useRef } from 'react';

const EditorBlock = styled(Responsive)`
	padding-top: 5rem;
	padding-bottom: 1rem;
`;
const TitleInput = styled.input`
	font-size: 2rem;
	outline: none;
	padding-bottom: 0.5rem;
	border: none;
	border-bottom: 1px solid ${palette.gray[4]};
	margin-bottom: 2rem;
	width: 100%;
`;

const WriteEditor = ({ title, body, onChangeField }) => {
	const editorRef = useRef();

	const onChangeTitle = e => {
		onChangeField({ key: 'title', value: e.target.value });
	};
	const onChangeContent = () => {
		const editorInstance = editorRef.current.getInstance();
		const getContent = editorInstance.getMarkdown();
		onChangeField({ key: 'body', value: getContent });
	};

	return (
		<div>
			<EditorBlock>
				<TitleInput placeholder="제목을 입력하세요" onChange={onChangeTitle} value={title} />
				<Editor
					ref={editorRef}
					height="400px"
					previewStyle="vertical"
					onChange={onChangeContent}
				/>
			</EditorBlock>
		</div>
	)
}

export default WriteEditor;
