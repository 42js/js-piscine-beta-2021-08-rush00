import "./App.css";
import React, { createContext, useState, useEffect } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";
import BoardPage from "./pages/BoardPage";
import ProfilePage from "./pages/ProfilePage";
import NavBar from "./components/NavBar/NavBar";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html, body, ul, input, textarea, button, a {
    all: unset;
    color: #343a3f;
  }

  a,button {
    cursor: pointer;
  }

  li {
    list-style: none;
  }

  #root {
    width: 100%;
    height: 100%;
    font-family: 'Noto Sans', sans-serif;
    font-weight: normal;
    color: #343a3f;
  }

  header {
    display: flex;
    justify-content: center;
    padding: 30px 0;
    h1 {
      cursor: pointer;
    }
  }
`;

export const UserAuthenticated = createContext(null);
export const SetUser = createContext(() => {});

export function App() {
  const [mode, setMode] = useState("home");
  const [email, setEmail] = useLocalStorage("email", null);

  return (
    <div className="App">
      <BrowserRouter basename="piscine-rush00">
        <UserAuthenticated.Provider value={email}>
          <SetUser.Provider value={setEmail}>
            <header>
              <Link to="/" onClick={() => setMode("home")}>
                <h1>Markdown Board</h1>
              </Link>
            </header>
            <NavBar mode={mode} setMode={setMode} />
            <Route path="/" exact={true} component={MainPage} />
            <Route path="/profile" component={ProfilePage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/logout" component={LogoutPage} />
            <Route path="/board" component={BoardPage} />
          </SetUser.Provider>
        </UserAuthenticated.Provider>
      </BrowserRouter>
      <GlobalStyle />
    </div>
  );
}

export function useLocalStorage(key, initialState) {
  const [state, setState] = useState(
    () => JSON.parse(window.localStorage.getItem(key)) || initialState
  );

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}
