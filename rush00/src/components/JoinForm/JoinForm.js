import React, { useState } from "react";
import styled from "styled-components";
import JoinDb from "./JoinDb";

const JoinFormStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  h2 {
    letter-spacing: 0.1em;
  }
  form {
    width: 320px;
    height: 340px;
    box-sizing: border-box;
    margin-bottom: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .join_field {
    label {
      font-weight: 500;
    }
    width: 100%;
    margin-bottom: 25px;
    letter-spacing: 0.1em;
  }
  input {
    width: 100%;
    height: 25px;
    background-color: #fff;
    border-bottom: 1px solid #eee;
    margin: 1px 1px 1px 1px;
    color: #036581;
  }
  .error {
    color: red;
  }
  .uploadButton {
    width: 80px;
    text-align: center;
    border: 1px solid #343a3f;
    border-radius: 20px;
    padding: 6px 10px;
    font-weight: 600;
    margin-top: 20px;
    :hover {
      background-color: #343a3f;
      color: #fff;
    }
  }
`;

const InputWithLabel = ({ label, ...rest }) => (
  <div className="join_field">
    <label>{label}</label>
    <input {...rest} />
  </div>
);

function JoinForm() {
  const [email, setEmail] = useState("");
  const [passwd, setPasswd] = useState("");
  const [confirm_passwd, setConfirmPasswd] = useState("");
  const [nickname, setNickname] = useState("");
  const [error, setError] = useState(null);

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswd = (e) => {
    setPasswd(e.target.value);
  };

  const handleComfirmPasswd = (e) => {
    setConfirmPasswd(e.target.value);
  };

  const handleNickname = (e) => {
    setNickname(e.target.value);
  };

  const handleClick = (e) => {
    if (passwd !== confirm_passwd) {
      e.preventDefault();
      setError("입력하신 비밀번호가 다릅니다.");
      setPasswd("");
      setConfirmPasswd("");
    } else {
      e.preventDefault(e);
      setError(null);
      JoinDb([email, passwd, nickname]);
      window.location.replace("/");
    }
  };

  return (
    <JoinFormStyled>
      <h2>회원가입</h2>
      <form>
        <InputWithLabel
          label="Email : "
          name="email"
          type="email"
          onChange={handleEmail}
        />
        <InputWithLabel
          label="Password : "
          id="passwd"
          type="password"
          onChange={handlePasswd}
        />
        <InputWithLabel
          label="Confirm Password : "
          id="confirm_passwd"
          type="password"
          onChange={handleComfirmPasswd}
        />
        {error ? <div className="error">{error}</div> : <div></div>}
        <InputWithLabel
          label="Nickname : "
          id="nickname"
          type="text"
          onChange={handleNickname}
        />
        <button className="uploadButton" onClick={handleClick}>
          Sign in
        </button>
      </form>
    </JoinFormStyled>
  );
}

export default JoinForm;
