import React from 'react';
import { toast } from 'react-toastify';
import { createTest } from '../../methods';
import './page.css';

class Test extends React.Component {

    constructor(props) {
        super(props);

        this.createTest = this.createTest.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
    }

    handleNameChange(event) {
        this.setState({
            testName: event.target.value
        });
    }

    async createTest() {
        if (this.state.testName.replace(/\s/g, '').length > 0) {
            const newTest = await createTest(this.state.testName);

            if (Object.keys(newTest).length === 0) { // case: when test with the same name already exists
                toast.dark('🦄 Sorry, test with such name already exists!', {});
            } else {
                this.setState({
                    testName: ''
                });

                window.location.hash = `#/tests`;
            }
        } else {
            toast.dark('🦄 Wow so easy!', {});
        }
    }

    async componentDidMount() {
        this.setState({
            testName: ''
        });
    }

    back() {
        window.location.hash = `#/tests`;
    }

    render() {
        const state = this.state;

        return (
            <div className="test-page">
                <h2>Test page</h2>
                <button onClick={() => this.back()}>Go back</button>
                <div>
                    <label>Test name:</label>
                    <input type="text" value={state && state.testName} onChange={(e) => this.handleNameChange(e)} />
                    <button onClick={() => this.createTest()}>Create</button>
                </div>
            </div>
        );
    }
}

export default Test;
