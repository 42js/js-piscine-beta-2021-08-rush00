import React, { useState } from "react";
import styled from "styled-components";
import ArticleList from "../components/Article/ArticleList";
import ArticleViewer from "../components/Article/ArticleViewer";
import EditForm from "../components/EditForm/EditForm";

const BoardStyled = styled.div``;

function BoardPage() {
  //list, create, edit, read
  const [mode, setMode] = useState("list");
  const handleCreateClick = () => {
    setMode("create");
  };
  const handleArticleClick = () => {
    setMode("read");
  };
  const handleUploadClick = () => {
    setMode("list");
  };
  const handleModifyClick = () => {
    console.log("modify");
    setMode("edit");
  };
  const handleDeleteClick = () => {
    setMode("list");
  };
  return (
    <BoardStyled>
      {mode === "list" && (
        <ArticleList
          handleClick={handleCreateClick}
          handleItemClick={handleArticleClick}
        />
      )}
      {mode === "read" && (
        <ArticleViewer
          handleModifyClick={handleModifyClick}
          handleDeleteClick={handleDeleteClick}
        />
      )}
      {(mode === "create" || mode === "edit") && (
        <EditForm mode={mode} handleClick={handleUploadClick} />
      )}
    </BoardStyled>
  );
}

export default BoardPage;
