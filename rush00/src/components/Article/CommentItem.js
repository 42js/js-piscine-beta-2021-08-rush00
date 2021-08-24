import React from "react";
import styled from "styled-components";

const CommentItemStyled = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  line-height: 2em;
  font-size: 0.9rem;
  padding: 3px;
  :hover {
    background-color: #ddf0ff;
  }
`;

CommentItemStyled.Content = styled.div``;

CommentItemStyled.Buttons = styled.div`
  display: flex;
  position: absolute;
  top: 3px;
  right: 15px;
  button {
    color: #ccc;
    margin: 0 5px;
    :hover {
      color: #036581;
    }
  }
`;

function CommentItem() {
  return (
    <CommentItemStyled>
      <CommentItemStyled.Content>안녕하세요!</CommentItemStyled.Content>
      <CommentItemStyled.Buttons>
        <button type="button">수정</button>
        <button type="button">삭제</button>
      </CommentItemStyled.Buttons>
    </CommentItemStyled>
  );
}

export default CommentItem;
