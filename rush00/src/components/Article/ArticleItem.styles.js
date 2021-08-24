import styled from "styled-components";

const ArticleItemStyled = styled.div`
  width: 100%;
  border-bottom: 1px solid #ddd;
  padding: 10px 5px;
  box-sizing: border-box;
  position: relative;

  .field_num {
    margin-right: 45px;
    display: inline-block;
    width: 23px;
  }
  .field_title {
    cursor: pointer;
  }
  .field_author {
    position: absolute;
    width: 42px;
    top: 10px;
    right: 10px;
    text-align: left;
  }
`;

export default ArticleItemStyled;
