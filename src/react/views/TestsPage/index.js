import React from 'react';
import './page.css';
import { getAllTests } from '../../methods';

class Tests extends React.Component {

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

    addTest() {
        window.location.hash = `#/test`;
    }

    render() {
        const {
            tests
        } = this.state;

        return (
            <div className="tests-page">
                <div className="tests-list">
                    <div id="tests-page-title">
                        Tests
                    </div>
                    <div id="add-test-btn" onClick={() => this.addTest()}>
                        Add test
                    </div>
                </div>
                <table className="tests">
                    <tr>
                        <th>Name</th>
                        <th>IP address</th>
                        <th>Created</th>
                    </tr>
                    {
                        tests && tests.map(test =>
                            <tr>
                                <td>{test.name}</td>
                                <td>{test.ip}</td>
                                <td>{new Date(test.created_at).toLocaleString()}</td>
                            </tr>
                        )
                    }
                </table>
            </div>
        );
    }
}

export default Tests;
