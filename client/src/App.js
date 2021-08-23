import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import CreateArticlePage from "./components/views/CreateArticlePage/CreateArticlePage";
import LandingPage from "./components/views/LandingPage/LandingPage";
import NavBar from "./components/views/NavBar/NavBar";
import ProfilePage from "./components/views/ProfilePage/ProfilePage";
import SigninPage from "./components/views/SigninPage/SigninPage";
import SIgnupPage from "./components/views/SignupPage/SIgnupPage";

function App() {
    return (
        <Router>
            <NavBar></NavBar>

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
