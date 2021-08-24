import React, { useState } from "react";
import styled from "styled-components";
import JoinForm from "../components/JoinForm/JoinForm";
import LoginForm from "../components/LoginForm/LoginForm";

const LoginPageStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  h2 {
    font-size: 21px;
    font-weight: 600;
    text-align: left;
    margin-bottom: 15%;
  }
  span {
    color: #1996fc;
    cursor: pointer;
    :hover {
      text-decoration: underline;
    }
  }
  .move {
    margin-bottom: 30px;
  }
`;

function LoginPage(props) {
  const [type, setType] = useState("login");

  const handleClick = () => {
    if (type === "login") setType("join");
    else if (type === "join") setType("login");
  };

  return (
    <LoginPageStyled>
      {type === "login" ? (
        <>
          <LoginForm />
          <div className="move">
            아직 회원이 아니신가요? <span onClick={handleClick}>회원가입</span>
          </div>
        </>
      ) : (
        <>
          <JoinForm />
          <div className="move">
            계정이 이미 있으신가요? <span onClick={handleClick}>로그인</span>
          </div>
        </>
      )}
    </LoginPageStyled>
  );
}

export default LoginPage;
