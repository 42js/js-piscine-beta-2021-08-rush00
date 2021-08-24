// import route from "color-convert/route";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LandingPage from "./components/views/LandingPage.js";
import LoginPage from "./components/views/LoginPage.js";

function App() {
    return (
        <Router>
            <div className="App">
                {/* <header className="header"> <h1> JIKWON & HANNKIM </h1> </header> */}
                <Switch>
                    <Route exact path="/" component={LoginPage} />
                    <Route exact path="/main" component={LandingPage} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
