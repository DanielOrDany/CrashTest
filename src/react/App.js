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
import { ToastContainer } from 'react-toastify';
import { injectStyle } from "react-toastify/dist/inject-style";

injectStyle();

class App extends React.Component {

    async componentDidMount() {
        window.location.hash = `#/tests`;
    }

    render() {
        return (
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
                <ToastContainer
                    position="bottom-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                <footer>
                    <div className="footer-text">
                    Rows per page: 10
                    </div>
                </footer>
            </div>
        );
    }
}

export default App;
