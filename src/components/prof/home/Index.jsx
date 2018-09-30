import React from 'react'
import "./src/css/home.css"
import FetchApi from "../../../utils/FetchAPI";
import AuthService from "../../../handlers/prof/AuthService";

export default class HomeIndex extends React.Component {
    constructor() {
        super();
        this.state = {
            topic: "",
            question_one: "",
            question_two: "",
            question_three: "",
            question_four: "",
            question_five: "",
            hideform: true,
            error: ""
        }

        this.Auth = new AuthService()
    }
    handleCreateform = () => {
        this.setState({ hideform: !this.state.hideform })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        let { question_five, question_one, question_two, question_three, question_four, topic } = this.state;


        if (question_one) {
            question_one = question_one.trim()
        }
        if (question_two) {
            question_two = question_two.trim()
        }
        if (question_three) {
            question_three = question_three.trim()
        }
        if (question_four) {
            question_four = question_four.trim()
        }
        if (question_five) {
            question_five = question_five.trim()
        }
        const data = { question_one, question_two, question_three, question_four, topic, question_five }

        if (question_five && question_one && question_two && question_three && question_four && topic) {
            const token = this.Auth.getToken()
            FetchApi('POST', '/api/prof/user', data, token)
                .then(res => {
                    if (res && res.data) {
                        if (res.data.success === true) {
                            this.setState({
                                topic: "",
                                question_one: "",
                                question_two: "",
                                question_three: "",
                                question_four: "",
                                question_five: ""
                            })
                        }
                    }
                })
                .catch(e => {
                    console.log(e)
                });
        }
        else {
            this.setState({ errors: 'Fields cannot be empty' })
        }
    }
    onChange = (e) => {
        const name = e.target.name;
        let value = e.target.value;
        this.setState({ [name]: value });
    }
    render() {
        const { question_five, question_one, question_two, question_three, question_four, topic } = this.state;
        return (
            <div className="form">
                <div>
                    <button onClick={this.handleCreateform} className="btn">Create Form</button>
                </div>
                <div className={this.state.hideform ? "hide" : null}>
                    <div>
                        {this.state.error}
                    </div>
                    <form onSubmit={this.handleSubmit} className="ques">
                        <input
                            className="input"
                            type="text"
                            value={topic}
                            name="topic"
                            placeholder="topic"
                            onChange={this.onChange}
                        /><br />
                        <textarea
                            className="input"
                            type="text"
                            value={question_one}
                            name="question_one"
                            placeholder="Question1"
                            onChange={this.onChange}
                        /><br />
                        <textarea
                            className="input"
                            type="text"
                            value={question_two}
                            name="question_two"
                            placeholder="Question2"
                            onChange={this.onChange}
                        /><br />
                        <textarea
                            className="input"
                            type="text"
                            value={question_three}
                            name="question_three"
                            placeholder="Question3"
                            onChange={this.onChange}
                        /><br />
                        <textarea
                            className="input"
                            type="text"
                            value={question_four}
                            name="question_four"
                            placeholder="Question4"
                            onChange={this.onChange}
                        /><br />
                        <textarea
                            className="input"
                            type="text"
                            value={question_five}
                            name="question_five"
                            placeholder="Question5"
                            onChange={this.onChange}
                        /><br />

                        <button type="submit" className="btn">Submit</button>
                    </form>
                </div>

            </div>
        )
    }
}
