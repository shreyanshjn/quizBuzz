import React, { Component } from 'react';
import validateInput from '../../../utils/validation/loginValidation';
import FetchApi from '../../../utils/FetchAPI';
import "./src/css/register.css"

// import './style.css';

export default class RegisterIndex extends Component {

    constructor() {
        super();
        this.state = {
            enrollment: '',
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

        const { enrollment, name, email, image, password } = this.state;

        const check = validateInput(password, 'password');
        if (check.isValid) {
            FetchApi('POST', '/api/student/auth/register', { enrollment, name, password, email })
                .then(res => {
                    if (res && res.data) {
                        if (res.data.success) {
                            this.props.history.push("/student/")
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
        const { enrollment, name, email, password, error } = this.state;
        return (
            <div className = "wrapper">
                {error}
                <form onSubmit={this.onSubmit} className = "student_register_form">
                    <h2>Register</h2>
                    <label htmlFor="inputEnrollment">Enrollment</label>
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
                    <div className = "main-button">
                       <button type="submit">Register</button>
                    </div>
                </form>
            </div>
        );
    }
}
