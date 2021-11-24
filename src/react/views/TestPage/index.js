import React, { Fragment } from 'react';
import { useAlert } from "react-alert";
import { createTest } from '../../methods';
import './page.css';

// const Test = () => {
//     const alert = useAlert();
//
//     return (
//         <Fragment>
//             <button
//                 onClick={() => {
//                     alert.show("Oh look, an alert!");
//                 }}
//             >
//                 Show Alert
//             </button>
//             <button
//                 onClick={() => {
//                     alert.error("You just broke something!");
//                 }}
//             >
//                 Oops, an error
//             </button>
//             <button
//                 onClick={() => {
//                     alert.success("It's ok now!");
//                 }}
//             >
//                 Success!
//             </button>
//         </Fragment>
//     );
// };
//
// export default Test;

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
        console.log(this.state.testName);
        if (this.state.testName.replace(/\s/g, '').length > 0) {
            await createTest(this.state.testName);

            this.setState({
                testName: ''
            });

            window.location.hash = `#/tests`;
        } else {
            const alert = useAlert();
            alert.show("Name cannot be empty string.");
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
