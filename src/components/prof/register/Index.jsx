import React, { Component } from 'react';
import validateInput from '../../../utils/validation/loginValidation';
import FetchApi from '../../../utils/FetchAPI';
import "./src/css/register.css"
// import './style.css';

export default class RegisterIndex extends Component {

    constructor() {
        super();
        this.state = {
            username: '',
            name: '',
            email: '',
            password: '',
            error: ''
        };
    }
    onChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value });
    }

    onSubmit = (e) => {
        e.preventDefault();
        const { username, name, email, password } = this.state;

        const check = validateInput(password, 'password');
        console.log(this.state);
        const data = { username, name, password, email };
        if (check.isValid) {
            console.log(data)
            FetchApi('POST', '/api/prof/auth/register', data)
                .then(res => {
                    if (res && res.data) {
                        if (res.data.success) {
                            this.props.history.push("/prof/")
                        } else {
                            this.setState({ error: res.data.msg })
                        }
                    }
                })
                .catch(() => {
                    this.setState({ error: 'Something Went Wrong' })
                });
        } else {
            this.setState({ error: check.errors.password })
        }
    }

    render() {
        const { username, name, email, password, error } = this.state;
        return (
            <div className="wrapper">
                {error}
                <form className = "prof_register_form" onSubmit={this.onSubmit}>
                    <h2>Register</h2>
                    <label htmlFor="inputUsername">Username</label>
                    <input
                        id="inputUsername"
                        type="text"
                        placeholder="Username"
                        name="username"
                        autoCorrect="off"
                        autoCapitalize="off"
                        value={username}
                        onChange={this.onChange}
                        required
                    />
                    <label htmlFor="inputName">Name</label>
                    <input
                        id="inputName"
                        type="text"
                        placeholder="Name"
                        name="name"
                        autoCorrect="off"
                        autoCapitalize="off"
                        value={name}
                        onChange={this.onChange}
                        required
                    />
                    <label htmlFor="inputEmail">Email</label>
                    <input
                        id="inputEmail"
                        type="text"
                        placeholder="Email"
                        name="email"
                        autoCorrect="off"
                        autoCapitalize="off"
                        value={email}
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
                    <div className="main-button">
                    <button type="submit">Register</button>
                    </div>
                </form>
            </div>
        );
    }
}
