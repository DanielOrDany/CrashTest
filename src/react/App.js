import React from 'react';
import './App.css';
import { getAllTests } from './methods';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isSignedIn: true
        };
    };

    async componentDidMount() {
      const tests = await getAllTests();

      console.log("tests", tests);

      this.setState({
          tests: tests
      })
    }


    render() {
        const {
            tests
        } = this.state;

        return (
            <div className="App">
                <header>
                </header>
                <div className="body">
                    <div className="page-title">
                    </div>
                    <div className="tests-list">
                        tests:
                        {
                            tests && tests.map(test => {
                               return (
                                   <div>{test.name}</div>
                               );
                            })
                        }
                    </div>
                </div>
                <footer>
                </footer>
            </div>
        );
    }
}

export default App;
