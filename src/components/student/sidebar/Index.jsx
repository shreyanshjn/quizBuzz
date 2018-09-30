import React, { Component } from 'react';
import "./src/css/sidebar.css";

class SidebarIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    componentDidMount() {
        var clickCount = 0;
        function keyPressHandler(e) {
            if (e.keyCode == 122) {
                clickCount++;
                if (clickCount == 2) {
                    warn();
                    e.preventDefault();
                }
                if (clickCount > 2) exit();

            }
        }
        function warn() {
            console.log("warning");
        }
        function exit() {
            console.log('exit');
        }

        window.addEventListener('keydown', keyPressHandler);
    }
    render() {
        return (
            <div className="student-navbar-parent">
                <div className="student_pic"></div>
                <label>Name</label><p>{this.props.userData.name}</p>
                <label>Enrollment</label><p>{this.props.userData.enrollment}</p>
                <label>Email</label><p>{this.props.userData.email}</p>
            </div>
        );
    }
}

export default SidebarIndex;