import styled from "styled-components";

const EditFormStyled = styled.div`
  padding: 30px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

EditFormStyled.Title = styled.form`
  min-width: 500px;
  max-width: 800px;
  width: 60vw;
  margin-bottom: 20px;
  input {
    width: 100%;
    height: 35px;
    border: 1px solid #ddd;
    padding-left: 10px;
    box-sizing: border-box;
    border-radius: 5px;
  }
`;

EditFormStyled.Body = styled.div`
  width: 60vw;
  min-width: 500px;
  max-width: 800px;
`;

EditFormStyled.Button = styled.button`
  width: 80px;
  text-align: center;
  border: 1px solid #343a3f;
  border-radius: 20px;
  padding: 6px 10px;
  font-weight: 600;
  margin: 40px 0;
  :hover {
    background-color: #343a3f;
    color: #fff;
  }
`;

export default EditFormStyled;
