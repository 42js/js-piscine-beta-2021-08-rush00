import React from "react";
import styled from "styled-components";
import CommentItem from "./CommentItem";

const CommentListStyled = styled.div`
  width: 70vw;
  margin-top: 35px;
  text-align: left;
`;

const CommentsWrapper = styled.div`
  width: 95%;
  height: 100px;
  overflow-y: scroll;
  overflow-x: hidden;
  box-sizing: border-box;
`;

function CommentList() {
  return (
    <CommentListStyled>
      <h3>Comments</h3>
      <CommentsWrapper>
        <CommentItem />
        <CommentItem />
        <CommentItem />
        <CommentItem />
        <CommentItem />
        <CommentItem />
      </CommentsWrapper>
    </CommentListStyled>
  );
}

export default CommentList;
