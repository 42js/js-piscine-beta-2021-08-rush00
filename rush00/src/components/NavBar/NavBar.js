import React, { useContext, useState } from "react";
import NavBarStyled from "./NavBar.styles";
import { Link } from "react-router-dom";
import { useLocalStorage, UserAuthenticated } from "../../App";

function NavBar() {
  const [mode, setMode] = useState("home");
  const [email, setEmail] = useLocalStorage("email", null);

  return (
    <NavBarStyled>
      <NavBarStyled.LinkWrapper
        onClick={() => setMode("home")}
        isActive={mode === "home"}
      >
        <Link to="/">HOME</Link>
      </NavBarStyled.LinkWrapper>
      <NavBarStyled.LinkWrapper
        onClick={() => setMode("profile")}
        isActive={mode === "profile"}
      >
        <Link to="/profile">PROFILE</Link>
      </NavBarStyled.LinkWrapper>
      <NavBarStyled.LinkWrapper
        onClick={() => setMode("board")}
        isActive={mode === "board"}
      >
        <Link to="/board">BOARD</Link>
      </NavBarStyled.LinkWrapper>
      {!email ? (
        <NavBarStyled.LinkWrapper
          onClick={() => setMode("login")}
          isActive={mode === "login"}
        >
          <Link to="/login">LOGIN</Link>
        </NavBarStyled.LinkWrapper>
      ) : (
        <NavBarStyled.LinkWrapper
          onClick={() => setMode("logout")}
          isActive={mode === "logout"}
        >
          <Link to="/logout">LOGOUT</Link>
        </NavBarStyled.LinkWrapper>
      )}
    </NavBarStyled>
  );
}

export default NavBar;
