import React from "react";
import ArticleItemStyled from "./ArticleItem.styles";

function ArticleItem({ handleClick }) {
  return (
    <ArticleItemStyled onClick={handleClick}>
      <span className="field_num">1</span>
      <span className="field_title">게시글 제목</span>
      <span className="field_author">선경</span>
    </ArticleItemStyled>
  );
}

export default ArticleItem;
