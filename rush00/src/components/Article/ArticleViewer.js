import React from "react";
import { ArticleViewerStyled, ArticleWrapper } from "./ArticleViewer.styles";
import CommentList from "./CommentList";

function ArticleViewer({ handleModifyClick, handleDeleteClick }) {
  return (
    <ArticleViewerStyled>
      <ArticleWrapper>
        <ArticleWrapper.Title>title</ArticleWrapper.Title>
        <ArticleWrapper.Content>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </ArticleWrapper.Content>
      </ArticleWrapper>
      <CommentList />
      <ArticleViewerStyled.Buttons>
        <button type="button" onClick={handleModifyClick}>
          수정
        </button>
        <button type="button" onClick={handleDeleteClick}>
          삭제
        </button>
      </ArticleViewerStyled.Buttons>
    </ArticleViewerStyled>
  );
}

export default ArticleViewer;
