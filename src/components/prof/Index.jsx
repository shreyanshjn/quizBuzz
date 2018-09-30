import React from 'react'
import { Route } from 'react-router-dom';
import LoginIndex from './login/Index';
import ProfLogoutIndex from './logout/Index';
import RegisterIndex from './register/Index';
import HomeIndex from './home/Index';

import AuthService from '../../handlers/prof/AuthService';

export default class StudentIndex extends React.Component {
    constructor() {
        super();
        this.state = {
            isAuthenticated: false
        };
        this.Auth = new AuthService();
    }

    componentWillMount() {
        const isAuthenticated = this.Auth.hasToken();
        this.setState({ isAuthenticated });
    }

    handleUpdate = isAuthenticated => {
        console.log(isAuthenticated);
        this.setState({ isAuthenticated })
    }

    render() {
        return (
            <React.Fragment>
                {this.state.isAuthenticated ?
                    <div>
                        {/* <Route path="/prof/home" component={NavbarIndex} /> */}
                        <Route exact path="/prof/logout" render={() => <ProfLogoutIndex updateRoutes={this.handleUpdate} />} />

                    </div>
                    :
                    <div>
                        <Route exact path="/prof/" component={HomeIndex} />
                        <Route exact path="/prof/register" component={RegisterIndex} />
                        {/*<Route exact path="/prof/" render={() => <LoginIndex updateRoutes={this.handleUpdate} />} />*/}
                    </div>
                }
            </React.Fragment>
        )
    }
}
