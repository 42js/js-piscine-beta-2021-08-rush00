import React from "react";
import styled from "styled-components";
import { ReactComponent as GithubIcon } from "../assets/icon-github.svg";
import { ReactComponent as EmailIcon } from "../assets/icon-email.svg";

const MainPageStyled = styled.div`
  margin: 60px auto;
  width: 50%;
  list-style: none;
  letter-spacing: 0.05em;
  color: #444;
  .about {
    text-align: center;
    margin-bottom: 80px;
  }
  hr {
    width: 100%;
  }
  .footer {
    padding: 5px 0 0 15px;
  }
  svg {
    width: 30px;
    height: 30px;
  }
  a {
    margin-right: 15px;
  }
  .contacts {
    margin-top: 35px;
  }
`;

MainPageStyled.Title = styled.h2`
  font-weight: 500;
  letter-spacing: 0.1em;
  margin: 40px 0 30px 0;
`;

function MainPage() {
  return (
    <MainPageStyled>
      <div className="about">
        <MainPageStyled.Title>Rush00</MainPageStyled.Title>
        <p>React, Node.js로 구현한 게시판 프로젝트입니다.</p>
        <p>로그인 후에 게시글을 작성하거나 수정, 삭제할 수 있습니다.</p>
        <p>Toast UI의 마크다운 에디터를 사용합니다. </p>
      </div>
      <hr />
      <div className="footer">
        <p>
          만든 사람:
          <br />
          (Frontend) hyeojung seomoon / (Backend) yahong
        </p>
        <p>
          개발 기간:
          <br />
          2021 08 23 - 2021 08 24
        </p>
        <div className="contacts">
          <a
            href="https://github.com/from97/piscine-rush00"
            target="_blank"
            rel="noreferrer"
          >
            <GithubIcon />
          </a>
          <a href="mailto:anstjs1104@gmail.com">
            <EmailIcon />
          </a>
        </div>
      </div>
    </MainPageStyled>
  );
}

export default MainPage;
