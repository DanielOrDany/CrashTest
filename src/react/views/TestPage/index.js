import React from 'react';
import './page.css';

class Test extends React.Component {
    constructor(props) {
        super(props);
    };

    async componentDidMount() {
    }

    back() {
        window.location.hash = `#/tests`;
    }

    render() {
        return (
            <div className="test-page">
                Test page
                <button onClick={() => this.back()}>Go back</button>
            </div>
        );
    }
}

export default Test;
