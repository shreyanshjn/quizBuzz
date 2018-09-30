import React, { Component } from 'react';

import AuthService from '../../../handlers/student/AuthService';
import validateInput from '../../../utils/validation/loginValidation';
import FetchApi from '../../../utils/FetchAPI';
import "./src/css/login.css";


export default class LoginIndex extends Component {

    constructor() {
        super();
        this.state = {
            enrollment: '',
            password: '',
            message: ''
        };
        this.Auth = new AuthService();
    }

    onChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value });
    }

    onSubmit = (e) => {
        e.preventDefault();

        const { enrollment, password } = this.state;

        const check = validateInput(password, 'password');
        if (check.isValid) {
            FetchApi('POST', '/api/student/auth/login', { enrollment, password })
                .then((result) => {
                    if (result.data) {
                        this.Auth.setToken(result.data.token)
                        this.setState({ message: '' })
                        this.props.updateData(result.data.body)
                        this.props.updateRoutes(true)
                    }
                })
                .catch(error => {
                    if (error.response && error.response.status === 401) {
                        this.setState({ message: 'Login failed. Username or password not match' });
                    }
                });
        } else {
            this.setState({ message: check.errors.password })
        }
    }

    render() {
        const { enrollment, password, message } = this.state;
        return (
            <div className = "wrapper">
                <form onSubmit={this.onSubmit} className = "student_login_form">
                    {message}
                    <h2>Please log in</h2>
                    <label htmlFor="inputEnrollment">Enrollment Number</label>
                    <input
                        id="inputEnrollment"
                        type="text"
                        placeholder="Enrollment Number"
                        name="enrollment"
                        autoCorrect="off"
                        autoCapitalize="off"
                        value={enrollment}
                        onChange={this.onChange}
                        required
                    />
                    <label htmlFor="inputPassword">Password</label>
                    <input
                        id="inputPassword"
                        type="password"
                        placeholder="Password"
                        name="password"
                        autoCorrect="off"
                        autoComplete="off"
                        autoCapitalize="off"
                        value={password}
                        onChange={this.onChange}
                        required
                    />
                    <div className = "main-button">
                      <button type="submit" className = "button">Login</button>
                    </div>
                </form>
            </div>
        );
    }
}
