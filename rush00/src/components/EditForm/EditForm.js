import React, { useRef, useState } from "react";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import EditFormStyled from "./EditForm.styles";
import axios from "axios";

function EditForm({ mode, handleClick }) {
  const [title, setTitle] = useState("");
  const editorRef = useRef();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleButtonClick = () => {
    const editor = editorRef.current.getInstance();
    console.log(title);
    console.log(editor.getMarkdown());
    console.log(editor.getHTML());
    const fetchArticle = async () => {
      try {
        const response = await axios.post("http://localhost:4242/board", {
          title: title,
          content: editor.getMarkdown(),
        });
        console.log(response);
      } catch (e) {
        console.log(e);
      }
      console.log("called fetchArticle()");
    };
    fetchArticle();
    handleClick();
  };

  return (
    <EditFormStyled>
      <EditFormStyled.Title>
        <input
          type="text"
          name="title"
          placeholder="제목을 입력하세요"
          onChange={handleTitleChange}
        ></input>
      </EditFormStyled.Title>
      <EditFormStyled.Body>
        <Editor
          ref={editorRef}
          hideModeSwitch={true}
          placeholder="마크다운 형식으로 내용을 입력해 주세요"
          previewStyle="tab"
          previewHighlight={false}
        />
      </EditFormStyled.Body>
      <EditFormStyled.Button
        type="button"
        className="uploadButton"
        onClick={handleButtonClick}
      >
        {mode === "create" ? "작성 완료" : "수정 완료"}
      </EditFormStyled.Button>
    </EditFormStyled>
  );
}

export default EditForm;
