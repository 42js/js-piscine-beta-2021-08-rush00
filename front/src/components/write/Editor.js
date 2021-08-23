import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import styled from 'styled-components';
import Responsive from '../common/Responsive';
import palette from '../../lib/styles/palette';
import { useRef } from 'react';
import { useEffect } from 'react';

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
const QuillWrapper = styled.div`
	.ql-editor {
		padding: 0;
		min-height: 320px;
		font-size: 1.125rem;
		line-height: 1.5;
	}
	.ql-editor.ql-blank::before {
		left: 0px;
	}
`;

const WriteEditor = ({ title, body, onChangeField }) => {

	const onChangeTitle = e => {
		onChangeField({ key: 'title', value: e.target.value });
	};

	return (
		<div>
			<EditorBlock>
				<TitleInput placeholder="제목을 입력하세요" onChange={onChangeTitle} value={title} />
				<Editor />
			</EditorBlock>
		</div>
	)
}

export default WriteEditor;
