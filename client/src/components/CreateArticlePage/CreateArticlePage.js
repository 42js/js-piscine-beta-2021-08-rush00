import React, { useState, useRef } from "react";
import "@toast-ui/editor/dist/toastui-editor.css";
//import "@toast-ui/editor/dist/toastui-viwer.css";
import { Button } from "antd";
import { Editor } from "@toast-ui/react-editor";
import ReactMarkdown from "react-markdown";

function CreateArticlePage() {
    const editorRef = useRef();

    const [content, setContent] = useState("");

    const handleEditorBtn = (e) => {
        const editorInstace = editorRef.current.getInstance();
        const getContent_md = editorInstace.getMarkdown();
        const getContent_html = editorInstace.getHTML();
        setContent(getContent_md);
        console.log(getContent_md);
        console.log(getContent_html);
        console.log(content);
    };
    return (
        <div>
            <Editor
                initialValue="hello react editor world!"
                previewStyle="vertical"
                height="600px"
                initialEditType="markdown"
                useCommandShortcut={true}
                ref={editorRef}
            />
            <Button type="primary" onClick={handleEditorBtn}>
                저장하기
            </Button>
            <ReactMarkdown>{content}</ReactMarkdown>
        </div>
    );
}

export default CreateArticlePage;
