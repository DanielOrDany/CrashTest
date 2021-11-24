import React from 'react';
import { createTest } from '../../methods';
import './page.css';

class Test extends React.Component {

    constructor(props) {
        super(props);
        this.state = {value: ''};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleChange(event) {
        this.setState({value: event.target.value});
      }
    
      handleSubmit(event) {
        alert('Ім\'я, що було надіслано: ' + this.state.value);
        event.preventDefault();
      }
    async componentDidMount() {
        const tests = await createTest();

        console.log("tests", tests);

        this.setState({
            tests: tests
        })
    }

    back() {
        window.location.hash = `#/tests`;
    }

    render() {
        return (
            <div className="test-page">
                Test page
                <button onClick={() => this.back()}>Go back</button>
                <form onSubmit={this.handleSubmit}>
                    <label>
                    Ім'я:
                    <input type="text" value={this.state.value} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Надіслати" />
                </form>
            </div>
        );
    }
}

export default Test;
