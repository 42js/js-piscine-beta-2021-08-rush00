import styled from "styled-components";

const ArticleListStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
  min-width: 400px;
  width: 80%;
  margin: 40px auto;
  box-sizing: border-box;
  position: relative;

  overflow: auto;

  .createButton {
    width: 100px;
    text-align: center;
    border: 1px solid #343a3f;
    border-radius: 20px;
    box-sizing: border-box;
    padding: 6px 10px;
    font-weight: 600;
    margin: 0 0 15px calc(100% - 110px);
    :hover {
      background-color: #343a3f;
      color: #fff;
    }
  }
`;

ArticleListStyled.Field = styled.div`
  border-top: 2px solid #ddd;
  width: 100%;
  border-bottom: 1px solid #ddd;
  display: flex;
  font-weight: bold;
  padding: 10px 5px;
  box-sizing: border-box;
  position: relative;
  .field_num {
    margin-right: 45px;
  }
  .field_author {
    position: absolute;
    top: 10px;
    right: 10px;
  }
`;

ArticleListStyled.Pagination = styled.div`
  margin-top: 40px;
  ul {
    display: flex;
  }
  li {
    width: 15px;
    margin-right: 10px;
    cursor: pointer;

    :hover {
      color: #036581;
      text-decoration: underline;
    }
  }
`;

export default ArticleListStyled;
