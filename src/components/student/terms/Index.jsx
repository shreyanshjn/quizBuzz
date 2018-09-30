import React, { Component } from 'react'

class Terms extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // clickCount:0
        }
    // }
    // keyPressHandler = (e) => {
    //     if (e.keyCode === 122) {
    //         this.setState({
    //             clickCount:this.state.clickCount++
    //         })
    //         if (this.state.clickCount === 2) {
    //             this.warn()
    //             e.preventDefault()
    //         }
    //         if (this.state.clickCount > 2)
    //         {
    //            this.exit()
    //         }
    //     }j
    // }
    // warn = () => {
    //     console.log("warning");
    // }
    // exit = () => {
    //     console.log('exit');
    // }
        //
    }
    // onTimerElapsed = () => {
    //     var myDiv = document.getElementById('theDiv')
    //     myDiv.style.display = myDiv.style.display === 'none' ? 'block' : 'none'
    // }
    // componentDidMount() {
    //     window.onload = setInterval(onTimerElapsed, 1000);
    //     window.addEventListener('keydown', keyPressHandler, false);
    // }
    // componentWillUnmount() {
    //     window.removeEventListener('keydown', keyPressHandler);
    // }
    render() {
        return (
            <div>
                {this.props.questions ? this.props.questions.map(question =>
                    <div>
                        <div id="theDiv">
                        </div>
                        <form>
                            <div>{question.topic}</div>
                            <div>
                                {question.question_one}
                                <textarea
                                    input="text"
                                    placeholder="Your response"
                                />
                            </div>
                            <div>{question.question_two}
                                <textarea
                                    input="text"
                                    placeholder="Your response"
                                /></div>
                            <div>{question.question_three}
                                <textarea
                                    input="text"
                                    placeholder="Your response"
                                /></div>
                            <div>{question.question_four}
                                <textarea
                                    input="text"
                                    placeholder="Your response"
                                /></div>
                            <div>{question.question_five}
                                <textarea
                                    input="text"
                                    placeholder="Your response"
                                />
                            </div>
                            <button type="submit">Submit</button>
                        </form>
                    </div>

                ) : null}
            </div>
        )
    }
}

export default Terms
