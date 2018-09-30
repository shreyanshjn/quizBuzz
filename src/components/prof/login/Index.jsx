import React, { Component } from 'react';
import "./src/css/login.css"
import AuthService from '../../../handlers/student/AuthService';
import validateInput from '../../../utils/validation/loginValidation';
import FetchApi from '../../../utils/FetchAPI';


export default class ProfLoginIndex extends Component {

    constructor() {
        super();
        this.state = {
            username: '',
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

        const { username, password } = this.state;

        const check = validateInput(password, 'password');
        if (check.isValid) {
            FetchApi('POST', '/api/prof/auth/login', { username, password })
                .then((result) => {
                    if (result.data) {
                        this.Auth.setToken(result.data.token)
                        this.setState({ message: '' })
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
        const { username, password, message } = this.state;
        return (
            <div className="main-login-parent">
                <form className="form" onSubmit={this.onSubmit}>
                    {message}
                    <h2 className="h2">Please log in</h2><br />
                    {/* <label className="lbl" htmlFor="inputName">Name</label><br/> */}
                    <input
                        className="input"
                        id="inputUserName"
                        type="text"
                        placeholder="Username"
                        name="username"
                        autoCorrect="off"
                        autoCapitalize="off"
                        value={username}
                        onChange={this.onChange}
                        required
                    /><br />
                    {/* <label className="lbl" htmlFor="inputPassword">Password</label><br/> */}
                    <input
                        className="input"
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
                    /><br />
                    <button className="btn" type="submit">Login</button>
                </form>
            </div>
        );
    }
}
