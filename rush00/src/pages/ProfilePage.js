import React from "react";
import axios from "axios";
import styled from "styled-components";
import { useLocalStorage } from "../App";

const ProfilePageStyled = styled.div`
  width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px dashed #ddd;
  border-radius: 20px;
  margin: 90px auto;
  padding: 30px 0 60px 0;
  letter-spacing: 0.05em;
  h2 {
    font-size: 21px;
    font-weight: 600;
    text-align: left;
    letter-spacing: 0.1em;
    margin-bottom: 45px;
  }
  li {
    line-height: 35px;
    letter-spacing: 0.12em;
  }
  .username {
    color: #00779b;
    margin-right: 2px;
  }
  .profile_field {
    font-weight: 500;
    margin-right: 5px;
  }
`;

function ProfilePage() {
  const [email, setEmail] = useLocalStorage("email", null);

  if (!email) window.location.replace("/");

  const handleProfile = async () => {
    await axios
      .get("http://localhost:4242/profile", { withCredentials: true })
      .then((response) => {
        console.log(response);
      })
      .catch((e) => alert(e));
  };

  handleProfile();

  return (
    <ProfilePageStyled>
      {/* <h2>
        <span className="username">{state.nickname}</span>의 프로필
      </h2>
      <ul>
        <li key="nickname">
          <span className="profile_field">Nickname: </span>
          {state.nickname}
        </li>
        <li key="email">
          <span className="profile_field">Email: </span>
          {state.email}
        </li>
      </ul> */}
    </ProfilePageStyled>
  );
}

export default ProfilePage;
