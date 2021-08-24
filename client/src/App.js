import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import CreateArticlePage from "./components/views/CreateArticlePage/CreateArticlePage";
import LandingPage from "./components/views/LandingPage/LandingPage";
import NavBar from "./components/views/NavBar/NavBar";
import ProfilePage from "./components/views/ProfilePage/ProfilePage";
import SigninPage from "./components/views/SigninPage/SigninPage";
import SIgnupPage from "./components/views/SignupPage/SIgnupPage";

import { Layout } from "antd";
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
                <Route path="/signup" component={SIgnupPage} />
                <Route path="/signin" component={SigninPage} />
            </Switch>
        </Router>
    );
}

export default App;
