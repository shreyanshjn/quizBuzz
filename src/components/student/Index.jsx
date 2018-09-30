import React from 'react'
import { Route } from 'react-router-dom';
import LoginIndex from './login/Index';
import LogoutIndex from './logout/Index';
import RegisterIndex from './register/Index';
import CollegeIndex from './student_dashboard/Index';
import SidebarIndex from './sidebar/Index';
import TermsIndex from "./terms/Index";

import AuthService from '../../handlers/student/AuthService';
import FetchApi from "../../utils/FetchAPI";


export default class StudentIndex extends React.Component {
    constructor() {
        super();
        this.state = {
            isAuthenticated: false,
            userData: "",
            error: "",
            questions: "",
            string: window.location.pathname.substring(9, 14)
        };
        this.Auth = new AuthService();
    }

    componentWillMount() {
        const isAuthenticated = this.Auth.hasToken();
        this.setState({ isAuthenticated });
    }

    handleUpdate = isAuthenticated => {
        this.setState({ isAuthenticated })
    }
    updateData = userData => {
        this.setState({ userData })
    }
    componentDidMount() {
        const isAuthenticated = this.Auth.hasToken();
        if (isAuthenticated) {
            const token = this.Auth.getToken();
            FetchApi("GET", "/api/student/user", null, token)
                .then(r => {
                    if (r && r.data && r.data.body) {
                        if (r.data.body) {
                            this.setState({ isAuthenticated: true, userData: r.data.body });
                        } else {
                            this.setState({ isAuthenticated: true });
                            this.props.history.push("/student/");
                        }
                    }
                })
                .catch(e => {
                    console.log(e);
                });

            FetchApi("GET", "/api/student/question", null, token)
                .then(r => {
                    if (r && r.data && r.data.body) {
                        if (r.data.body) {
                            this.setState({ questions: r.data.body });
                        } else {
                            this.setState({ errors: "Failed fetch details" });
                        }
                    }
                })
                .catch(e => {
                    console.log(e);
                });
        }


    }

    render() {
        return (
            <React.Fragment>
                {this.state.isAuthenticated ?
                    <div>
                        {this.state.string === "terms" ? null :
                            <Route path="/student/" render={props => (<SidebarIndex {...props} userData={this.state.userData} />)} />
                        }
                        <Route exact path="/student/logout" render={() => <LogoutIndex updateRoutes={this.handleUpdate} />} />
                        <Route exact path="/student/" render={props => (<CollegeIndex {...props} questions={this.state.questions} />)} />
                        <Route exact path="/student/terms" render={props => (<TermsIndex {...props} questions={this.state.questions} />)} />

                    </div>
                    :
                    <div>
                        <Route exact path="/student/register" component={RegisterIndex} />
                        <Route exact path="/student/" render={() => <LoginIndex updateRoutes={this.handleUpdate} updateData={this.updateData} />} />
                    </div>
                }
            </React.Fragment>
        )
    }
}
