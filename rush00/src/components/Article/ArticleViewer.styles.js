import styled from "styled-components";

export const ArticleViewerStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

ArticleViewerStyled.Buttons = styled.div`
  display: flex;
  margin-bottom: 50px;
  button {
    width: 80px;
    text-align: center;
    border: 1px solid #343a3f;
    border-radius: 20px;
    padding: 6px 10px;
    font-weight: 600;
    margin: 40px 15px 0 15px;
    :hover {
      background-color: #343a3f;
      color: #fff;
    }
  }
`;

export const ArticleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 80vw;
  margin: 40px auto 0;
`;

export const Comments = styled.div``;

ArticleWrapper.Title = styled.h2`
  border-bottom: 1px solid #ddd;
  padding: 15px;
  margin: 0;
`;

ArticleWrapper.Content = styled.p`
  padding: 20px 0 20px 15px;
  margin: 0;
`;
