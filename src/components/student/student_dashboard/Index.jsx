import React, { Component } from 'react';
import "./style.css"
import { Link } from "react-router-dom";

class CollegeIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }

    }
    componentDidMount() {

    }
    render() {
        console.log(this.props.questions)
        return (
            <div className="dashboard">
                <h1>{this.props.questions ? this.props.questions.map((question, index) =>
                    <div key={index}>
                        <div>{question.topic}</div>
                        <Link to="/student/terms">
                            <button>Proceed For Test</button>
                        </Link>
                    </div>

                ) : null}</h1>
            </div>
        );
    }
}

export default CollegeIndex;