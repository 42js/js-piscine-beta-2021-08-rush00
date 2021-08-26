import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import CreateArticlePage from "./components/CreateArticlePage/CreateArticlePage";
import LandingPage from "./components/LandingPage/LandingPage";
import NavBar from "./components/NavBar/NavBar";
import ProfilePage from "./components/ProfilePage/ProfilePage";

import { Layout } from "antd";
import SignupPageContainer from "./components/SignupPage/SignupPageContainer";
import SigninPageContainer from "./components/SigninPage/SigninPageContainer";
const { Header } = Layout;

function App() {
    return (
        <Router>
            <Layout>
                <Header>
                    <NavBar></NavBar>
                </Header>
            </Layout>

            <Switch>
                <Route exact path="/" component={LandingPage} />
                <Route path="/article/create" component={CreateArticlePage} />
                <Route path="/profile" component={ProfilePage} />
                <Route path="/signup" component={SignupPageContainer} />
                <Route path="/signin" component={SigninPageContainer} />
            </Switch>
        </Router>
    );
}

export default App;
