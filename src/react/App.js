import React from 'react';
import './App.css';
import home_icon from "./home_white_24dp.svg";
import {
    HashRouter as Router,
    Route,
    Switch
} from 'react-router-dom';
import TestPage from "./views/TestPage";
import TestsPage from "./views/TestsPage";
import AlertTemplate from "react-alert-template-basic";
import { positions, Provider } from "react-alert";

const options = {
    timeout: 5000,
    position: positions.BOTTOM_CENTER
};

class App extends React.Component {

    async componentDidMount() {
        window.location.hash = `#/tests`;
    }

    render() {
        return (
            <Provider template={AlertTemplate} {...options}>
                <div className="App">
                    <header>
                        <div id="home-btn">
                            <img src={home_icon} alt="Home icon"/>
                        </div>
                    </header>
                    <div className="body">
                        <Router hashType="noslash" basename="/tests">
                            <Switch>
                                <Route path="/test" component={() => <TestPage/>}/>
                                <Route path="/tests" component={() => <TestsPage/>}/>
                                <Route path="/" component={() => <TestsPage/>}/>
                            </Switch>
                        </Router>
                    </div>
                    <footer>
                        <div className="footer-text">
                        Rows per page: 10
                        </div>
                    </footer>
                </div>
            </Provider>
        );
    }
}

export default App;
